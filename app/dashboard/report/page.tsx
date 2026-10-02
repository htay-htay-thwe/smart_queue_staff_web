import { FileText } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

export default function Report() {
  return (
    <div className="page-shell">
      <PageHeader title="Reports" description="Review queue performance and export business insights." icon={FileText} eyebrow="Analytics" />
      <div className="surface-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><FileText className="size-6" /></div>
        <h2 className="text-lg font-semibold text-slate-900">Reports are coming soon</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">This area will bring together queue volume, wait times, and table usage in one exportable view.</p>
      </div>
    </div>
  );
}
