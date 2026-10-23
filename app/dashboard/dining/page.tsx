"use client";

import { useState, useMemo } from "react";
import OneCard from "./card/OneCard";
import { Utensils } from "lucide-react";
import { useFetchQueue } from "@/hooks/useQueue";
import { useShopStore } from "@/store/shopStore";
import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import { PageHeader } from "@/components/dashboard/page-header";

export default function QueueDining() {
  const [currentPage, setCurrentPage] = useState(1);

  const shopData = useShopStore((s) => s.shop);
  const queueUserData = useFetchQueue(shopData._id);

  const queueHistories = useMemo(
    () => (queueUserData.data ?? []).filter(
      (q) => ["seated", "serving", "in service"].includes(String(q?.status).trim().toLowerCase()),
    ),
    [queueUserData.data],
  );

  const totalPages = Math.ceil(queueHistories.length / 10);
  const pagedData = queueHistories.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="page-shell">
      <PageHeader title="Dining" description="Monitor currently seated customers and table activity." icon={Utensils} eyebrow="Floor status" action={
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-emerald-700">
                {queueHistories.length} Active
              </span>
            </div>
        </div>} />

      <div>
        <OneCard data={pagedData} />
        <div className="mt-6">
          <PaginationSeatAssign
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
