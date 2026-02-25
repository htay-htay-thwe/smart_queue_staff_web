"use client";

import { useState, useMemo } from "react";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import { History, Filter } from "lucide-react";
import { useShopStore } from "@/store/shopStore";
import HistoryCard from "./card/HistoryCard";
import { useFetchQueueHistory } from "@/hooks/useQueue";

export default function Queue() {
  const [selectedFilter, setSelectedFilter] = useState("all");

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
  const currentPage = 1;
  const totalPages = Math.ceil(filteredData.length / 10);

  return (
    <div className="p-6">
      {/* Modern Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
            <History className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Queue History</h1>
            <p className="text-sm text-gray-500 mt-1">
              View all past queue records and customer visits
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border-2 border-blue-200">
            <div className="text-sm font-semibold text-gray-600">
              Total Records
            </div>
            <div className="text-2xl font-bold text-[#157aa2] mt-1">
              {queueUserData.data?.length || 0}
            </div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100/50 p-4 rounded-xl border-2 border-green-200">
            <div className="text-sm font-semibold text-gray-600">
              Filtered Results
            </div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {filteredData.length}
            </div>
          </div>

          {/* Date Filter Dropdown */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border-2 border-purple-200">
            <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter by Date
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border-2 border-purple-300 bg-white text-purple-700 font-bold text-base focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all duration-200 hover:border-purple-400"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-delay-2">
        <HistoryCard data={filteredData} />
      </div>
      <div className="mt-6 animate-fade-in-delay-3">
        <PaginationSeatAssign
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={() => {}}
        />
      </div>
    </div>
  );
}
