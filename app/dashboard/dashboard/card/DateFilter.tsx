"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function generateSixMonthRanges(createdAt: string | Date) {
  const ranges: { label: string; start: Date }[] = [];

  const startDate = new Date(createdAt);
  const now = new Date();

  let currentStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (currentStart <= now) {
    const end = new Date(
      currentStart.getFullYear(),
      currentStart.getMonth() + 5,
      1,
    );

    const label = `${monthNames[currentStart.getMonth()]} ${currentStart.getFullYear()} - ${monthNames[end.getMonth()]} ${end.getFullYear()}`;

    ranges.push({
      label,
      start: new Date(currentStart),
    });

    currentStart = new Date(
      currentStart.getFullYear(),
      currentStart.getMonth() + 6,
      1,
    );
  }

  return ranges;
}

export default function DateFilter({
  createdAt,
  onChange,
}: {
  createdAt: string;
  onChange: (startDate: Date) => void;
}) {
  const ranges = useMemo(() => generateSixMonthRanges(createdAt), [createdAt]);

  const [selected, setSelected] = useState(ranges[ranges.length - 1]);

  const handleSelect = (range: any) => {
    setSelected(range);
    onChange(range.start);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {selected?.label}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {ranges.map((item) => (
          <DropdownMenuItem key={item.label} onClick={() => handleSelect(item)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
