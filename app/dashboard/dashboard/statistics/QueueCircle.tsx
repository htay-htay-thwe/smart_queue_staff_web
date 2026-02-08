"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { name: "Queue Accepted", value: 54, color: "#2563eb" }, 
  { name: "Queue Canceled", value: 30, color: "#22c55e" },
  { name: "Total Pending", value: 26, color: "#ef4444" }, 
];

export default function QueueCircle() {
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
            stroke="none">
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
                    54%
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
