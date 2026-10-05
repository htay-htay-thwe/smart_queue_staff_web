"use client";

import { useState, useMemo } from "react";
import OneCard from "./card/OneCard";
import { Utensils } from "lucide-react";
import { useFetchQueue } from "@/hooks/useQueue";
import { useShopStore } from "@/store/shopStore";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import { PageHeader } from "@/components/dashboard/page-header";

const FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "week" },
  { label: "Last 30 Days", value: "month" },
];

export default function QueueDining() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const shopData = useShopStore((s) => s.shop);
  const queueUserData = useFetchQueue(shopData._id);

  const queueHistories = useMemo(
    () => (queueUserData.data ?? []).filter(
      (q) => ["seated", "serving", "in service"].includes(String(q?.status).trim().toLowerCase()),
    ),
    [queueUserData.data],
  );

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
  const pagedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="page-shell">
      <PageHeader title="Dining" description="Monitor currently seated customers and table activity." icon={Utensils} eyebrow="Floor status" action={
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-emerald-700">
                {queueHistories.length} Active
              </span>
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
        <OneCard data={pagedData} />
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
