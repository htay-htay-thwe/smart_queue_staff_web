"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, Filter } from "lucide-react";

interface DateFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function DateFilter({ selectedFilter, onFilterChange }: DateFilterProps) {
  const filters = [
    { value: "all", label: "All" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
  ];

  return (
    <div className="mb-6 animate-fade-in-delay-1">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Filter by Date</h3>
            <p className="text-xs text-gray-500">Select a time period to view records</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`
                px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300
                ${
                  selectedFilter === filter.value
                    ? "bg-linear-to-r from-[#157aa2] to-[#1C7AA5] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }
              `}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>

        {selectedFilter !== "all" && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-700 flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#157aa2]" />
              <span>
                Showing records for: <strong className="text-[#157aa2]">{filters.find(f => f.value === selectedFilter)?.label}</strong>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
