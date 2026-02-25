import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import profile from "@/asset/image/default.png";
import Image from "next/image";
import {
  Clock,
  Calendar,
  Hash,
  Armchair,
  CheckCircle2,
  User,
} from "lucide-react";
import { Queue } from "@/types/shopQueue.api.types";

interface OneCardProps {
  data: Queue[];
}

export default function HistoryCard({ data }: OneCardProps) {
  console.log("HistoryCard received data:", data);
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          No Records Found
        </h3>
        <p className="text-gray-500 text-sm text-center max-w-md">
          No queue history matches the selected date filter. Try selecting a
          different time period.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {data.map((user, index) => (
        <Card
          key={index}
          className="w-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group border-2 border-gray-100 hover:border-[#157aa2]/30 bg-linear-to-br from-white to-gray-50/50"
        >
          <CardHeader className="pb-4 pt-5">
            {/* User Info */}
            <CardTitle className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative w-13 h-13">
                    <Image
                      src={user.customer_id?.profileImg || profile}
                      alt="Profile"
                      width={52}
                      height={52}
                      className="rounded-full ring-2 ring-[#157aa2]/20 group-hover:ring-[#157aa2] transition-all duration-300 object-cover w-full h-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      {user.customer_id?.name}
                    </div>
                    <p className="text-xs text-gray-500 font-normal mt-0.5">
                      {user.userRequirements}
                    </p>
                  </div>
                </div>
              </div>
            </CardTitle>

            <CardDescription className="mb-0 space-y-3">
              {/* Queue and Seat Info */}
              <div className="grid grid-cols-2 gap-3">
                {/* Queue Number */}
                <div className=" p-3 rounded-xl border border-blue-200 group-hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-3.5 h-3.5 text-[#157aa2]" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Queue
                    </span>
                  </div>
                  <div className="text-base font-bold text-[#157aa2]">
                    {user.queue_number}
                  </div>
                </div>

                {/* Seat Number */}
                <div className=" p-3 rounded-xl border border-green-200 group-hover:border-green-300 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Armchair className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Seat
                    </span>
                  </div>
                  <div className="text-base font-bold text-green-600">
                    {user.table_no}
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  {/* Status Badge Inline */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[#157aa2] rounded-lg shadow-md font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {user.status}
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
