"use client";

import { useState, useMemo } from "react";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import { History } from "lucide-react";
import { useShopStore } from "@/store/shopStore";
import HistoryCard from "./card/HistoryCard";
import { useFetchQueueHistory } from "@/hooks/useQueue";
import { PageHeader } from "@/components/dashboard/page-header";

const FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "week" },
  { label: "Last 30 Days", value: "month" },
];

export default function Queue() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const shopData = useShopStore((s) => s.shop);

  const queueUserData = useFetchQueueHistory(shopData._id);
  const filteredData = useMemo(() => {
    if (selectedFilter === "all") {
      return queueUserData.data || [];
    }

    return (queueUserData.data || []).filter((item) => {
      const itemDateStr = new Date(item.updatedAt).toISOString().slice(0, 10);
      const todayStr = new Date().toISOString().slice(0, 10);

      const itemDate = new Date(itemDateStr);
      const todayDate = new Date(todayStr);

      const diffTime = todayDate.getTime() - itemDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      switch (selectedFilter) {
        case "today":
          return itemDateStr === todayStr;
        case "yesterday":
          return diffDays === 1;
        case "week":
          return diffDays >= 0 && diffDays <= 7;
        case "month":
          return diffDays >= 0 && diffDays <= 30;
        default:
          return true;
      }
    });
  }, [selectedFilter, queueUserData.data]);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pagedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="page-shell">
      <PageHeader title="Queue History" description="Review completed and cancelled customer visits." icon={History} eyebrow="Records" action={
        <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl font-bold text-primary">{queueUserData.data?.length || 0}</p>
              <p className="text-xs text-slate-400 font-medium">Total</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-right">
              <p className="text-xl font-bold text-emerald-600">{filteredData.length}</p>
              <p className="text-xs text-slate-400 font-medium">Showing</p>
            </div>
        </div>} />

      <div className="surface-card mb-6 flex items-center gap-2 overflow-x-auto p-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setSelectedFilter(f.value);
                setCurrentPage(1);
              }}
              aria-pressed={selectedFilter === f.value}
              className={`filter-pill whitespace-nowrap ${
                selectedFilter === f.value
                  ? "filter-pill-active"
                  : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      <div>
        <HistoryCard data={pagedData} />
        <div className="mt-6">
          <PaginationSeatAssign
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
