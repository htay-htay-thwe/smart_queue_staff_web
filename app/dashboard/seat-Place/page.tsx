"use client";

import { Button } from "@/components/ui/button";
import SeatScroll from "./card/SeatScroll";
import { ArrowLeft } from "lucide-react";

export default function SeatPlace() {
  return (
    <div className="p-6 min-h-screen">
      <div onClick={() => window.history.back()} className="flex gap-3 hover:text-gray-500 mb-5">
        <ArrowLeft />
        <div>Back</div>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="font-medium">Queue Number -</p>
            <span className="bg-green-300 px-2 py-1 text-xs rounded">
              A1000
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-medium">User Name -</p>
            <span className="bg-green-300 px-2 py-1 text-xs rounded">
              Htay Thwe
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <p className="font-medium">Seat Number -</p>
          <span className="bg-red-500 px-2 py-1 text-xs text-white rounded">
            A12
          </span>
        </div>
      </div>


      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between mt-6 gap-4">
        <h2 className="text-lg font-semibold text-blue-500">
          Restaurant Tables Exhibition
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-300" />
            <span className="text-blue-500 text-base">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-blue-500 text-base">Unavailable</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-blue-500 text-base">Selected</span>
          </div>
        </div>

        <Button className="bg-blue-600 px-6 py-3 rounded-full w-28 text-lg">
          Assign
        </Button>
      </div>


      <SeatScroll />
    </div>
  );
}