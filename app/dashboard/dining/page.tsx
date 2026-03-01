"use client";

import { useState, useMemo } from "react";
import OneCard from "./card/OneCard";
import { Utensils } from "lucide-react";
import { useFetchQueue } from "@/hooks/useQueue";
import { useShopStore } from "@/store/shopStore";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";

const FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "week" },
  { label: "Last 30 Days", value: "month" },
];

export default function QueueDining() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const shopData = useShopStore((s) => s.shop);
  const queueUserData = useFetchQueue(shopData._id);

  const queueHistories =
    queueUserData.data?.filter(
      (q) => String(q?.status).toLowerCase() === "seated",
    ) || [];

  const filteredData = useMemo(() => {
    if (selectedFilter === "all") return queueHistories;

    return queueHistories.filter((item) => {
      const itemDate = new Date(item.updatedAt);
      const today = new Date();
      const diffDays = Math.floor(
        (today.getTime() - itemDate.getTime()) / 86400000,
      );
      switch (selectedFilter) {
        case "today":
          return diffDays === 0;
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
  }, [selectedFilter, queueHistories]);

  const totalPages = Math.ceil(filteredData.length / 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 md:px-8 py-5 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-11 h-11 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
              Dining
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Currently seated customers
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3 md:gap-4 shrink-0">
            <div className="flex items-center gap-1.5 md:gap-2 bg-emerald-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-emerald-700">
                {queueHistories.length} Active
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-right">
              <p className="text-xl md:text-2xl font-bold text-slate-700">
                {filteredData.length}
              </p>
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
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
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
        <OneCard data={filteredData} />
        <div className="mt-6">
          <PaginationSeatAssign
            currentPage={1}
            totalPages={totalPages}
            setCurrentPage={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
