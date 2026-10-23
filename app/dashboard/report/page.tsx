"use client";

import { useMemo, useState } from "react";
import {
  BarChart3, CheckCircle2, Clock3, Download, FileText, RefreshCw,
  TrendingDown, TrendingUp, UsersRound, XCircle,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { useFetchQueue, useFetchQueueHistory } from "@/hooks/useQueue";
import { useShopStore } from "@/store/shopStore";
import type { Queue } from "@/types/shopQueue.api.types";

type Range = "30d" | "90d" | "year" | "all";
const RANGE_LABELS: Record<Range, string> = { "30d": "Last 30 days", "90d": "Last 90 days", year: "This year", all: "All time" };
const outcomeColors = ["#1E7A9B", "#E14949", "#F59E0B", "#7C3AED"];
const normalizedStatus = (queue: Queue) => String(queue.status || "").trim().toLowerCase();
const completed = new Set(["finished", "completed", "served", "done"]);
const missed = new Set(["expired", "no-show"]);
const cancelled = new Set(["cancelled", "canceled"]);
const dateOf = (queue: Queue) => new Date(queue.completedAt || queue.updatedAt || queue.createdAt);
const customerId = (queue: Queue) => String(typeof queue.customer_id === "object" ? queue.customer_id?._id : queue.customer_id || "");

function startFor(range: Range, now = new Date()) {
  if (range === "all") return null;
  if (range === "year") return new Date(now.getFullYear(), 0, 1);
  const result = new Date(now);
  result.setDate(result.getDate() - (range === "30d" ? 30 : 90));
  return result;
}
function percent(value: number, total: number) { return total ? Math.round((value / total) * 100) : 0; }
function durationMinutes(queue: Queue) {
  const start = new Date(queue.createdAt).getTime();
  const end = new Date(queue.completedAt || queue.updatedAt).getTime();
  return Number.isFinite(start) && Number.isFinite(end) && end >= start ? (end - start) / 60000 : null;
}
function formatDuration(minutes: number) {
  if (!minutes) return "—";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${Math.round(minutes % 60)}m`;
}

export default function Report() {
  const shop = useShopStore((state) => state.shop);
  const [range, setRange] = useState<Range>("90d");
  const historyQuery = useFetchQueueHistory(shop._id);
  const liveQuery = useFetchQueue(shop._id);
  const history = useMemo(() => Array.isArray(historyQuery.data) ? historyQuery.data : [], [historyQuery.data]);
  const active = useMemo(() => Array.isArray(liveQuery.data) ? liveQuery.data : [], [liveQuery.data]);
  const loading = historyQuery.isPending || liveQuery.isPending;

  const report = useMemo(() => {
    const start = startFor(range);
    const rows = history.filter((queue) => !start || dateOf(queue) >= start);
    const done = rows.filter((queue) => completed.has(normalizedStatus(queue))).length;
    const noShows = rows.filter((queue) => missed.has(normalizedStatus(queue))).length;
    const cancelledCount = rows.filter((queue) => cancelled.has(normalizedStatus(queue))).length;
    const other = Math.max(0, rows.length - done - noShows - cancelledCount);
    const durations = rows.map(durationMinutes).filter((value): value is number => value !== null);
    const averageDuration = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : 0;
    const uniqueCustomers = new Set(rows.map(customerId).filter(Boolean)).size;

    const monthMap = new Map<string, { month: string; sort: number; queues: number; completed: number }>();
    rows.forEach((queue) => {
      const date = new Date(queue.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const item = monthMap.get(key) || { month: date.toLocaleDateString("en", { month: "short", year: "2-digit" }), sort: new Date(date.getFullYear(), date.getMonth(), 1).getTime(), queues: 0, completed: 0 };
      item.queues += 1;
      if (completed.has(normalizedStatus(queue))) item.completed += 1;
      monthMap.set(key, item);
    });
    const monthly = [...monthMap.values()].sort((a, b) => a.sort - b.sort).slice(-12);

    const hourMap = Array.from({ length: 24 }, (_, hour) => ({ hour, label: `${String(hour).padStart(2, "0")}:00`, queues: 0 }));
    rows.forEach((queue) => { const hour = new Date(queue.createdAt).getHours(); if (Number.isFinite(hour)) hourMap[hour].queues += 1; });
    const peakHours = hourMap.filter((item) => item.queues > 0);
    const busiest = [...peakHours].sort((a, b) => b.queues - a.queues)[0];

    const tableMap = new Map(shop.tableTypes.map((type) => [type._id, type.type]));
    const seatCounts = new Map<string, number>();
    rows.forEach((queue) => {
      const id = String(typeof queue.table_type_id === "object" ? (queue.table_type_id as any)?._id : queue.table_type_id || "");
      const label = tableMap.get(id) || (typeof queue.table_type_id === "object" ? (queue.table_type_id as any)?.type : "") || "Other";
      seatCounts.set(label, (seatCounts.get(label) || 0) + 1);
    });
    const seating = [...seatCounts].map(([name, queues]) => ({ name, queues })).sort((a, b) => b.queues - a.queues);
    return {
      rows, done, noShows, cancelledCount, other, averageDuration, uniqueCustomers, monthly, peakHours, busiest, seating,
      outcomes: [
        { name: "Completed", value: done },
        { name: "No-show / expired", value: noShows },
        { name: "Cancelled", value: cancelledCount },
        { name: "Other", value: other },
      ].filter((item) => item.value > 0),
    };
  }, [history, range, shop.tableTypes]);

  const exportCsv = () => {
    const headings = ["Queue number", "Customer", "Status", "Seat type", "Joined", "Completed", "Duration minutes"];
    const tableMap = new Map(shop.tableTypes.map((type) => [type._id, type.type]));
    const lines = report.rows.map((queue) => {
      const typeId = String(typeof queue.table_type_id === "object" ? (queue.table_type_id as any)?._id : queue.table_type_id || "");
      return [
        queue.queue_number,
        typeof queue.customer_id === "object" ? queue.customer_id?.name : "",
        queue.status,
        tableMap.get(typeId) || typeId,
        queue.createdAt,
        queue.completedAt || queue.updatedAt,
        Math.round(durationMinutes(queue) || 0),
      ].map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",");
    });
    const blob = new Blob([[headings.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${shop.name || "shop"}-queue-report-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const refresh = () => { void historyQuery.refetch(); void liveQuery.refetch(); };
  return <div className="page-shell">
    <PageHeader title="Queue Report" description="Understand customer demand, queue outcomes, and operational performance." icon={FileText} eyebrow="Business analytics" action={
      <div className="flex flex-wrap gap-2">
        <button onClick={refresh} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}/>Refresh</button>
        <button onClick={exportCsv} disabled={!report.rows.length} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1E7A9B] px-4 text-sm font-semibold text-white disabled:opacity-40"><Download className="h-4 w-4"/>Export CSV</button>
      </div>
    }/>

    <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {(Object.keys(RANGE_LABELS) as Range[]).map((value) => <button key={value} onClick={() => setRange(value)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition ${range === value ? "bg-[#1E7A9B] text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}>{RANGE_LABELS[value]}</button>)}
    </div>

    {historyQuery.isError ? <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Report data could not be loaded. Please refresh and try again.</div> : null}

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Metric icon={UsersRound} label="Total queues" value={report.rows.length} note={`${report.uniqueCustomers} unique customers`} tone="blue"/>
      <Metric icon={CheckCircle2} label="Completed" value={report.done} note={`${percent(report.done, report.rows.length)}% completion rate`} tone="green"/>
      <Metric icon={Clock3} label="Avg. queue duration" value={formatDuration(report.averageDuration)} note="Join to queue completion" tone="violet"/>
      <Metric icon={XCircle} label="Lost queues" value={report.noShows + report.cancelledCount} note={`${report.noShows} no-show · ${report.cancelledCount} cancelled`} tone="red"/>
      <Metric icon={BarChart3} label="Active now" value={active.length} note={report.busiest ? `Peak: ${report.busiest.label}` : "No peak data yet"} tone="amber"/>
    </section>

    {!loading && !report.rows.length ? <EmptyReport/> : <div className="mt-6 grid gap-6 xl:grid-cols-5">
      <ChartCard className="xl:col-span-3" title="Customer volume" subtitle="Queues joined and completed by month">
        <ResponsiveContainer width="100%" height={300}><BarChart data={report.monthly} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/><XAxis dataKey="month" tick={{fontSize:11,fill:"#64748B"}} axisLine={false} tickLine={false}/><YAxis allowDecimals={false} tick={{fontSize:11,fill:"#64748B"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #E2E8F0"}}/><Legend/><Bar dataKey="queues" name="Joined" fill="#8CC7DA" radius={[7,7,0,0]}/><Bar dataKey="completed" name="Completed" fill="#1E7A9B" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard className="xl:col-span-2" title="Queue outcomes" subtitle="How customer queues ended">
        <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={report.outcomes} dataKey="value" nameKey="name" innerRadius={68} outerRadius={102} paddingAngle={2}>{report.outcomes.map((item,index)=><Cell key={item.name} fill={outcomeColors[index % outcomeColors.length]}/>)}</Pie><Tooltip/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard className="xl:col-span-3" title="Peak joining hours" subtitle="When customers most often enter the queue">
        <ResponsiveContainer width="100%" height={270}><BarChart data={report.peakHours} margin={{top:10,right:8,left:-18,bottom:0}}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/><XAxis dataKey="label" tick={{fontSize:10,fill:"#64748B"}} interval="preserveStartEnd" axisLine={false} tickLine={false}/><YAxis allowDecimals={false} tick={{fontSize:11,fill:"#64748B"}} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="queues" name="Queues" fill="#1E7A9B" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard className="xl:col-span-2" title="Seating demand" subtitle="Queue demand by requested table type">
        <div className="space-y-5 py-3">{report.seating.length ? report.seating.map((item) => { const maximum = Math.max(...report.seating.map((row) => row.queues),1); return <div key={item.name}><div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-slate-700">{item.name}</span><span className="font-bold text-[#1E7A9B]">{item.queues} queues</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1E7A9B]" style={{width:`${(item.queues/maximum)*100}%`}}/></div></div>}) : <p className="py-16 text-center text-sm text-slate-400">No seating data for this period.</p>}</div>
      </ChartCard>
    </div>}

    <section className="mt-6 grid gap-4 md:grid-cols-3">
      <Insight icon={TrendingUp} title="Completion health" text={report.rows.length ? `${percent(report.done,report.rows.length)}% of queues completed successfully in this period.` : "Complete more queues to unlock this insight."}/>
      <Insight icon={Clock3} title="Busiest time" text={report.busiest ? `${report.busiest.label} is your busiest joining hour with ${report.busiest.queues} queues.` : "Peak-hour insight appears when queue history is available."}/>
      <Insight icon={TrendingDown} title="Queue loss" text={report.rows.length ? `${percent(report.noShows+report.cancelledCount,report.rows.length)}% of queues were cancelled or expired.` : "Queue-loss insight appears when history is available."}/>
    </section>
  </div>;
}

function Metric({ icon: Icon, label, value, note, tone }: { icon: any; label: string; value: string | number; note: string; tone: string }) {
  const styles: Record<string,string> = { blue:"bg-sky-50 text-[#1E7A9B]", green:"bg-emerald-50 text-emerald-600", violet:"bg-violet-50 text-violet-600", red:"bg-red-50 text-red-600", amber:"bg-amber-50 text-amber-600" };
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p><strong className="mt-2 block text-2xl font-black text-slate-900">{value}</strong></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${styles[tone]}`}><Icon className="h-5 w-5"/></span></div><p className="mt-3 text-xs leading-5 text-slate-500">{note}</p></article>;
}
function ChartCard({ title, subtitle, className="", children }: { title:string; subtitle:string; className?:string; children:React.ReactNode }) {
  return <section className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}><div className="mb-4"><h2 className="font-bold text-slate-900">{title}</h2><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>{children}</section>;
}
function Insight({icon:Icon,title,text}:{icon:any;title:string;text:string}) { return <article className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1E7A9B]/10 text-[#1E7A9B]"><Icon className="h-5 w-5"/></span><div><strong className="text-sm text-slate-800">{title}</strong><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></article> }
function EmptyReport() { return <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><FileText className="h-11 w-11 text-slate-300"/><h2 className="mt-4 font-bold text-slate-800">No report data for this period</h2><p className="mt-2 max-w-md text-sm text-slate-500">Choose a wider date range. Completed, cancelled, and expired queues will appear here automatically.</p></div> }
