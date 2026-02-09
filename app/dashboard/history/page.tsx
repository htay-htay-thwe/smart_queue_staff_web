"use client";

import { useState, useMemo } from "react";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import OneCard, { allData } from "./card/OneCard";
import { History, Filter } from "lucide-react";

export default function Queue() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter data based on selected date filter
  const filteredData = useMemo(() => {
    const today = new Date(2026, 1, 9); // February 9, 2026
    
    if (selectedFilter === "all") {
      return allData;
    }

    return allData.filter((item) => {
      const [day, month, year] = item.date.split(".").map(Number);
      const itemDate = new Date(year, month - 1, day);
      const diffTime = today.getTime() - itemDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

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
  }, [selectedFilter]);
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
            <p className="text-sm text-gray-500 mt-1">View all past queue records and customer visits</p>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border-2 border-blue-200">
            <div className="text-sm font-semibold text-gray-600">Total Records</div>
            <div className="text-2xl font-bold text-[#157aa2] mt-1">
              {allData.length}
            </div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100/50 p-4 rounded-xl border-2 border-green-200">
            <div className="text-sm font-semibold text-gray-600">Filtered Results</div>
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
        <OneCard data={filteredData} />
      </div>
      <div className="mt-6 animate-fade-in-delay-3">
        <PaginationSeatAssign />
      </div>
    </div>
  );
}
