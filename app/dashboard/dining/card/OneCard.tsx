"use client";

import profile from "@/asset/image/default.png";
import Image from "next/image";
import { Clock, Armchair, Utensils, LogOut } from "lucide-react";
import { Queue } from "@/types/shopQueue.api.types";
import { useRouter } from "next/navigation";
import { useReleaseTable } from "@/hooks/useQueue";

interface OneCardProps {
  data: Queue[];
}

export default function OneCard({ data }: OneCardProps) {
  const router = useRouter();
  const { mutate: releaseTableMutate, isPending } = useReleaseTable(router);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
          <Utensils className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-600 mb-2">
          No Active Diners
        </h3>
        <p className="text-slate-400 text-sm text-center max-w-sm">
          All tables are currently free.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {data.map((user, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-5">
            {/* Table label + live pill */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[#157aa2]/10 to-[#157aa2]/5 rounded-2xl flex flex-col items-center justify-center border border-[#157aa2]/20 shadow-inner">
                  <Armchair className="w-5 h-5 text-[#157aa2] mb-0.5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">
                    Table
                  </p>
                  <p className="text-2xl font-black text-slate-800 leading-tight">
                    {user.table_no}
                  </p>
                </div>
              </div>

              {/* Live badge */}
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 mt-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-600">
                  LIVE
                </span>
              </div>
            </div>

            {/* Customer info block */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
              <div className="relative shrink-0">
                <Image
                  src={user.customer_id?.profileImg || profile}
                  alt="Profile"
                  width={44}
                  height={44}
                  className="rounded-xl object-cover ring-2 ring-white shadow-sm w-11 h-11"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800 text-sm truncate">
                  {user.customer_id?.name}
                </p>
                {user.userRequirements && (
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {user.userRequirements}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-center pl-2 border-l border-slate-200">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Queue
                </p>
                <p className="text-base font-black text-[#157aa2]">
                  #{user.queue_number}
                </p>
              </div>
            </div>

            {/* Time seated */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-500 font-medium">
                Seated at&nbsp;
                <span className="text-slate-700 font-bold">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              </span>
              <span className="ml-auto text-xs text-slate-400">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString([], {
                      day: "2-digit",
                      month: "short",
                    })
                  : ""}
              </span>
            </div>

            {/* Free Table button */}
            <button
              onClick={() =>
                releaseTableMutate({
                  shop_id: user.shop_id._id,
                  table_no: user.table_no ?? "",
                  table_type_id: user.table_type_id ?? "",
                })
              }
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-rose-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {isPending ? "Releasing..." : "Free Table"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}