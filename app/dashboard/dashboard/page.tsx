import LiveTable from "./card/LiveTable";
import MostQueueUser from "./card/MostQueueUser";
import QueuePie from "./card/QueuePie";
import { QueueRecord } from "./statistics/QueueRecord";
import { BarChart3 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 bg-[#F8F7F1] min-h-screen lg:w-1/3 w-full">
        {/* Modern Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Today's Statistics</h1>
              <p className="text-xs text-gray-500 mt-0.5">Real-time queue analytics and insights</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="animate-fade-in-delay-1">
            <QueuePie />
          </div>
          <div className="animate-fade-in-delay-2">
            <MostQueueUser />
          </div>
        </div>
      </div>

      <div className="p-6 min-h-screen w-full lg:w-2/3">
        <div className="flex flex-col gap-5">
          <div className="animate-fade-in-delay-1">
            <LiveTable />
          </div>
          <div className="animate-fade-in-delay-2">
            <QueueRecord />
          </div>
        </div>
      </div>
    </div>
  );
}
