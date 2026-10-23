"use client";

import { Loader2, Store, UsersRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { changeQueueAvailability } from "@/services/profile.service";
import { useShopStore } from "@/store/shopStore";

export default function QueueAvailability() {
  const shop = useShopStore((state) => state.shop);
  const setShop = useShopStore((state) => state.setShop);
  const [pending, setPending] = useState(false);
  const isOpen = shop.isQueueOpen !== false;

  const toggle = async () => {
    const next = !isOpen;
    if (!next && !window.confirm("Close queue joining? Existing customers will stay active, but new customers cannot join.")) return;
    setPending(true);
    try {
      const response = await changeQueueAvailability(next);
      const updated = response?.data ?? response;
      setShop({ isQueueOpen: updated?.isQueueOpen ?? next });
      toast.success(next ? "Queue joining is open" : "Queue joining is closed");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Could not update queue availability");
    } finally { setPending(false); }
  };

  return <section className={`mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm ${isOpen ? "border-emerald-200" : "border-slate-300"}`}>
    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isOpen ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
          {isOpen ? <UsersRound className="h-6 w-6"/> : <Store className="h-6 w-6"/>}
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Queue availability</h2>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isOpen ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{isOpen ? "OPEN" : "CLOSED"}</span>
          </div>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">{isOpen ? "Customers can currently join your queue from the mobile app and website." : "New queue joining is paused. Existing waiting, checked-in, and seated customers are not affected."}</p>
        </div>
      </div>
      <button type="button" role="switch" aria-checked={isOpen} aria-label="Accept new queues" disabled={pending || !shop._id} onClick={() => void toggle()} className={`relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isOpen ? "bg-[#1E7A9B]" : "bg-slate-300"}`}>
        <span className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${isOpen ? "translate-x-7" : "translate-x-1"}`}>{pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-[#1E7A9B]"/>}</span>
      </button>
    </div>
  </section>;
}
