"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import QueueAreaChart from "./QueueAreaChart";
import DateFilter from "../card/DateFilter";

const data = [
  { month: "May", value: 250 },
  { month: "Jun", value: 180 },
  { month: "Jul", value: 220 },
  { month: "Aug", value: 200 },
  { month: "Sep", value: 240 },
  { month: "Oct", value: 230 },
];

export function QueueRecord() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex gap-7 items-center">
          <div>Queue Record</div>
          <div>
            <DateFilter />
          </div>
        </CardTitle>
        <CardAction className="flex justify-start">
          <div className="flex gap-7 items-center">
            <div className="flex">
              <div className="h-3 w-3 mt-1.5 rounded-full bg-blue-500 inline-block mr-2"></div>
              <div className="text-muted-foreground">Last 6 months</div>
            </div>
              <div className="flex">
              <div className="h-3 w-3 mt-1.5 rounded-full bg-gray-300 inline-block mr-2"></div>
              <div className="text-muted-foreground">Same period last year</div>
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <QueueAreaChart />
      </CardContent>
    </Card>
  );
}
