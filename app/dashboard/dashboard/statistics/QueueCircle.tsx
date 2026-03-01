"use client";

import { useFetchQueue, useFetchQueueHistory } from "@/hooks/useQueue";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

type QueueCircleProps = {
  id: string;
  acceptedPercentage: number;
  pendingPercentage: number;
  canceledPercentage: number;
};

export default function QueueCircle({ acceptedPercentage, pendingPercentage, canceledPercentage }: QueueCircleProps) {

  const data = [
    {
      name: "Queue Accepted",
      value: acceptedPercentage,
      color: "#22c55e",
    },
    { name: "Queue Canceled", value: canceledPercentage, color: "#ef4444" },
    { name: "Total Pending", value: pendingPercentage, color: "#2563eb" },
  ];
  return (
    <div className="w-full h-[260px] flex items-center justify-center">
      <ResponsiveContainer width={260} height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={110}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}

            <Label
              position="center"
              content={() => (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x="50%"
                    dy="-0.2em"
                    className="text-xl font-semibold fill-foreground"
                  >
                    {acceptedPercentage.toFixed(0)}%
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.2em"
                    className="text-sm fill-muted-foreground"
                  >
                    Accepted
                  </tspan>
                </text>
              )}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
