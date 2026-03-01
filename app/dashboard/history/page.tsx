"use client";

import { useState, useMemo } from "react";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import { History } from "lucide-react";
import { useShopStore } from "@/store/shopStore";
import HistoryCard from "./card/HistoryCard";
import { useFetchQueueHistory } from "@/hooks/useQueue";

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
    setCurrentPage(1); // reset to page 1 whenever filter changes
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 md:px-8 py-5 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-11 h-11 shrink-0 bg-gradient-to-br from-[#157aa2] to-[#0d5c7d] rounded-2xl flex items-center justify-center shadow-lg shadow-[#157aa2]/25">
            <History className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">Queue History</h1>
            <p className="text-xs md:text-sm text-slate-500">All past customer visits &amp; queue records</p>
          </div>
          <div className="ml-auto flex items-center gap-3 md:gap-4 shrink-0">
            <div className="text-right">
              <p className="text-xl md:text-2xl font-bold text-[#157aa2]">{queueUserData.data?.length || 0}</p>
              <p className="text-xs text-slate-400 font-medium">Total</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-right">
              <p className="text-xl md:text-2xl font-bold text-emerald-600">{filteredData.length}</p>
              <p className="text-xs text-slate-400 font-medium">Showing</p>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedFilter === f.value
                  ? "bg-[#157aa2] text-white shadow-md shadow-[#157aa2]/30"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-5">
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
