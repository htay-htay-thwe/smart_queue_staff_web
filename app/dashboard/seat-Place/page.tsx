"use client";

import { Button } from "@/components/ui/button";
import SeatScroll from "./card/SeatScroll";
import { ArrowLeft, Armchair } from "lucide-react";

export default function SeatPlace() {
  return (
    <div className="p-6 min-h-screen">
      <div onClick={() => window.history.back()} className="flex gap-3 hover:text-gray-500 mb-5 cursor-pointer transition-all duration-300 hover:gap-4 animate-fade-in">
        <ArrowLeft />
        <div>Back</div>
      </div>

      {/* Modern Header */}
      <div className="mb-6 animate-fade-in-delay-1">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
            <Armchair className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Seat Assignment</h1>
            <p className="text-sm text-gray-500 mt-1">Select and assign seats to customers</p>
          </div>
        </div>
      </div>

      {/* Clean Info Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm animate-fade-in-delay-2">
        <div className="flex items-center justify-between gap-8">
          {/* Queue Number */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <span className="text-gray-700 font-bold text-xl">#</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Queue Number</p>
              <p className="text-2xl font-bold text-gray-900">A1000</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-gray-200" />

          {/* Customer Name */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <span className="text-gray-700 font-bold text-xl">👤</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Customer Name</p>
              <p className="text-2xl font-bold text-gray-900">Htay Thwe</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-gray-200" />

          {/* Selected Seat */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Armchair className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Selected Seat</p>
              <p className="text-2xl font-bold text-gray-900">A12</p>
            </div>
          </div>
        </div>
      </div>


      {/* Header Bar with Legend and Assign Button */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6 shadow-md animate-fade-in-delay-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Restaurant Seating Layout
            </h2>
            <p className="text-sm text-gray-500">Click on any available table to select</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 rounded-md bg-gray-300 border border-gray-400" />
              <span className="text-gray-700 text-sm font-medium">Available</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 rounded-md bg-gray-400 border border-gray-500" />
              <span className="text-gray-700 text-sm font-medium">Occupied</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
              <div className="w-4 h-4 rounded-md bg-purple-500 border border-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Selected</span>
            </div>
          </div>

          <Button className="bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] px-8 py-3 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Assign Seat
          </Button>
        </div>
      </div>


      <SeatScroll />
    </div>
  );
}