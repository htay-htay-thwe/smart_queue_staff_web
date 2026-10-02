"use client";

import { Users } from "lucide-react";
import LiveTable from "../dashboard/card/LiveTable";
import GenerateQrDialog from "./card/GenerateQrDialog";
import { PageHeader } from "@/components/dashboard/page-header";

export default function Queue() {
  return (
    <div className="page-shell">
      <PageHeader title="Queue Management" description="Assign customers and keep the waiting line moving." icon={Users} eyebrow="Live operations" action={<GenerateQrDialog />} />
      <div className="animate-fade-in-delay-1">
        <LiveTable />
      </div>
    </div>
  );
}
