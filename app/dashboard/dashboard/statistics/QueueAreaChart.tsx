"use client";

import { formattedData, QueueRecord } from "@/types/shopQueue.api.types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type QueueRecordProps = {
  data: formattedData[];
};

export default function QueueAreaChart({ data }: QueueRecordProps) {
  console.log("Formatted:", data);
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value}
          />
          <Tooltip />

          {/* Area (Last 6 months) */}
          <Area
            type="monotone"
            dataKey="current"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#colorCurrent)"
            dot={false}
          />

          {/* Comparison line (last year) */}
          <Area
            type="monotone"
            dataKey="last"
            stroke="#9ca3af"
            strokeDasharray="4 4"
            fill="none"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
