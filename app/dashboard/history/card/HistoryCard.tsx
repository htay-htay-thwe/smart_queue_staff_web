import profile from "@/asset/image/default.png";
import Image from "next/image";
import { Calendar, Armchair, CheckCircle2 } from "lucide-react";
import { Queue } from "@/types/shopQueue.api.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OneCardProps {
  data: Queue[];
}

export default function HistoryCard({ data }: OneCardProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
          <Calendar className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-600 mb-2">No History Found</h3>
        <p className="text-slate-400 text-sm text-center max-w-sm">
          No queue history matches the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* ── Mobile layout ── */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((user, index) => (
          <div key={index} className="px-4 py-4">
            {/* Top row: avatar + name + status */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative shrink-0">
                <Image
                  src={user.customer_id?.profileImg || profile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover ring-2 ring-slate-100 w-10 h-10"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800 text-sm leading-tight truncate">
                  {user.customer_id?.name}
                </p>
                {user.userRequirements && (
                  <p className="text-xs text-slate-400 truncate">
                    {user.userRequirements}
                  </p>
                )}
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-[#157aa2]/10 text-[#157aa2] rounded-lg text-xs font-bold capitalize border border-[#157aa2]/20">
                <CheckCircle2 className="w-3 h-3" />
                {user.status}
              </span>
            </div>
            {/* Bottom row: Queue / Table / Date */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#157aa2]/10 text-[#157aa2] rounded-lg text-xs font-bold">
                #{user.queue_number}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200">
                <Armchair className="w-3 h-3" />
                {user.table_no || "—"}
              </span>
              <span className="text-xs text-slate-500 ml-auto">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
                    " · " +
                    new Date(user.updatedAt).toLocaleDateString([], { day: "2-digit", month: "short" })
                  : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop layout — shadcn Table ── */}
      <div className="hidden md:block">
        <Table className="[&_th]:px-5 [&_th]:py-4 [&_td]:px-5 [&_td]:py-4">
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-widest w-[280px]">
                Customer
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Queue #
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Table
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Date &amp; Time
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow
                key={index}
                className="group hover:bg-slate-50/80 transition-colors cursor-default"
              >
                {/* Customer */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <Image
                        src={user.customer_id?.profileImg || profile}
                        alt="Profile"
                        width={42}
                        height={42}
                        className="rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-[#157aa2]/20 transition-all w-[42px] h-[42px]"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm leading-tight truncate">
                        {user.customer_id?.name}
                      </p>
                      {user.userRequirements && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[160px]">
                          {user.userRequirements}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Queue # */}
                <TableCell>
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-[#157aa2]/10 text-[#157aa2] rounded-xl font-bold text-sm">
                    #{user.queue_number}
                  </span>
                </TableCell>

                {/* Table */}
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-200">
                    <Armchair className="w-3.5 h-3.5" />
                    {user.table_no || "—"}
                  </span>
                </TableCell>

                {/* Date & Time */}
                <TableCell>
                  <p className="font-semibold text-slate-700 text-sm">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : "—"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
                      : "—"}
                  </p>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#157aa2]/10 text-[#157aa2] rounded-xl text-xs font-bold capitalize border border-[#157aa2]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
