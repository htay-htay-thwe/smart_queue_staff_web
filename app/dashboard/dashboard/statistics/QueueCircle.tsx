"use client";

import { useFetchQueue, useFetchQueueHistory } from "@/hooks/useQueue";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

type QueueCircleProps = {
  id: string;
};

export default function QueueCircle({ id }: QueueCircleProps) {
  const fectHistory = useFetchQueueHistory(id);
  const fetchQueue = useFetchQueue(id);
  console.log("Queue history data in QueueCircle:", fectHistory.data);
  const seated =
    fetchQueue.data?.filter((item) => item.status === "seated").length || 0;
  const acceptedCount =
    (fectHistory.data?.filter((item) => item.status === "finished").length ||
      0) + seated;
  const pendingCount =
    fectHistory.data?.filter((item) => item.status === "waiting").length || 0;
  const canceledCount =
    fectHistory.data?.filter((item) => item.status === "canceled").length || 0;

  const totalCount = acceptedCount + pendingCount + canceledCount;
  const acceptedPercentage =
    totalCount > 0 ? (acceptedCount / totalCount) * 100 : 0;
  console.log("Accepted percentage:", acceptedPercentage);
  const pendingPercentage =
    totalCount > 0 ? (pendingCount / totalCount) * 100 : 0;
  const canceledPercentage =
    totalCount > 0 ? (canceledCount / totalCount) * 100 : 0;

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
