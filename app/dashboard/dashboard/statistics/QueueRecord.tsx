"use client";

import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QueueAreaChart from "./QueueAreaChart";
import DateFilter from "../card/DateFilter";
import { useFetchQueueRecord } from "@/hooks/useQueue";

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function generateSixMonthsComparison(
  apiData: any[] = [],
  startDate: Date
) {
  const result = [];

  for (let i = 0; i < 6; i++) {
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1
    );

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // current year data
    const currentData = apiData.find(
      (item) =>
        Number(item.year) === currentYear &&
        Number(item.month) === currentMonth
    );

    // last year same month
    const lastYearData = apiData.find(
      (item) =>
        Number(item.year) === currentYear - 1 &&
        Number(item.month) === currentMonth
    );

    result.push({
      month: monthNames[currentMonth - 1],
      current: currentData ? currentData.totalFinished : 0,
      last: lastYearData ? lastYearData.totalFinished : 0,
    });
  }

  return result;
}

export function QueueRecord({
  id,
  createdAt,
}: {
  id: string;
  createdAt: string;
}) {
  const { data } = useFetchQueueRecord(id);

  // default = current month
  const [startDate, setStartDate] = useState(new Date());

  const formattedData = generateSixMonthsComparison(
    data || [],
    startDate
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex gap-7 items-center">
          <div>Queue Record</div>

          <DateFilter
            createdAt={createdAt}
            onChange={(start) => setStartDate(start)}
          />
        </CardTitle>

        <CardAction className="flex justify-start">
          <div className="flex gap-7 items-center">
            <div className="flex">
              <div className="h-3 w-3 mt-1.5 rounded-full bg-blue-500 mr-2"></div>
              <div className="text-muted-foreground">
                Selected 6 months
              </div>
            </div>

            <div className="flex">
              <div className="h-3 w-3 mt-1.5 rounded-full bg-gray-500 mr-2"></div>
              <div className="text-muted-foreground">
                Same period last year
              </div>
            </div>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        <QueueAreaChart data={formattedData} />
      </CardContent>
    </Card>
  );
}