import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QueueCircle from "../statistics/QueueCircle";
import { useFetchQueue, useFetchQueueHistory } from "@/hooks/useQueue";

type QueuePieProps = {
  id: string;
};

export default function QueuePie({ id }: QueuePieProps) {
  const fectHistory = useFetchQueueHistory(id);
  const fetchQueue = useFetchQueue(id);
  console.log("Queue history data in QueueCircle:", fectHistory.data);
  const seated =
    fetchQueue.data?.filter((item) => item.status === "seated").length || 0;
  const acceptedCount =
    (fectHistory.data?.filter((item) => item.status === "finished").length ||
      0) + seated;
  const pendingCount =
    fectHistory.data?.filter((item) => item.status === "waiting").length || 0;
  const canceledCount =
    fectHistory.data?.filter((item) => item.status === "canceled").length || 0;

  const totalCount = acceptedCount + pendingCount + canceledCount;
  const acceptedPercentage =
    totalCount > 0 ? (acceptedCount / totalCount) * 100 : 0;
  console.log("Accepted percentage:", acceptedPercentage);
  const pendingPercentage =
    totalCount > 0 ? (pendingCount / totalCount) * 100 : 0;
  const canceledPercentage =
    totalCount > 0 ? (canceledCount / totalCount) * 100 : 0;
  return (
    <div className="group">
      <Card className="w-full gap-1 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <CardHeader className="">
          <CardTitle>Accepted vs Cancel</CardTitle>
          <CardAction className="bg-gray-100 p-1 text-sm rounded-sm">
            Today
          </CardAction>
        </CardHeader>
        <CardContent className="pt-2">
          <QueueCircle
            id={id}
            acceptedPercentage={acceptedPercentage}
            pendingPercentage={pendingPercentage}
            canceledPercentage={canceledPercentage}
          />
        </CardContent>
        <CardFooter className="justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-green-500 inline-block mr-2"></div>
            <div>Queue Accepted</div>
          </div>
          <div className="">{acceptedPercentage.toFixed(0)}%</div>
        </CardFooter>
        <div className="flex justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-red-500 inline-block mr-2"></div>
            <div>Queue Canceled</div>
          </div>
          <div className="">{canceledPercentage.toFixed(0)}%</div>
        </div>
        <div className="flex justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-blue-500 inline-block mr-2"></div>
            <div>Queue Pending</div>
          </div>
          <div className="">{pendingPercentage.toFixed(0)}%</div>
        </div>
      </Card>
    </div>
  );
}
