"use client";
import { useShopStore } from "@/store/shopStore";
import LiveTable from "./card/LiveTable";
import MostQueueUser from "./card/MostQueueUser";
import QueuePie from "./card/QueuePie";
import { QueueRecord } from "./statistics/QueueRecord";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

export default function Dashboard() {
  const userData = useShopStore((s) => s.shop);
  console.log("Dashboard userData", userData);
  return (
    <div className="page-shell">
      <PageHeader title="Today’s Overview" description="See live queue activity, table availability, and service trends." icon={BarChart3} eyebrow="Dashboard" />
      <div className="grid gap-6 xl:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.7fr)]">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="animate-fade-in-delay-1">
            <QueuePie id={userData._id} />
          </div>
          <div className="animate-fade-in-delay-2">
            <MostQueueUser id={userData._id} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-5">
          <div className="animate-fade-in-delay-1">
            <LiveTable />
          </div>
          <div className="animate-fade-in-delay-2">
            <QueueRecord id={userData._id} createdAt={userData.createdAt} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
