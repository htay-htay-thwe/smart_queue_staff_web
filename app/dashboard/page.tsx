import LiveTable from "./card/LiveTable";
import MostQueueUser from "./card/MostQueueUser";
import QueuePie from "./card/QueuePie";
import { QueueRecord } from "./statistics/QueueRecord";
// F8F7F1
export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 bg-[#F8F7F1] min-h-screen lg:w-1/3 w-full">
        <h1 className="text-2xl font-bold mb-6">Todays Statistics</h1>
        <div className="flex flex-col gap-5">
          <QueuePie />
          <MostQueueUser />
          <div className="flex flex-row gap-5 w-full justify-center text-gray-600 ">
            <div>Smart Queue System © 2026 smart queue, Inc.</div>
            <div className="border border-r-gray-300"></div>
            <div>Community guidelines Terms of service</div>
          </div>
        </div>
      </div>

      <div className="p-6 min-h-screen w-full lg:w-2/3">
        <div className="flex flex-col gap-5">
          <LiveTable />
          <QueueRecord />
        </div>
      </div>
    </div>
  );
}
