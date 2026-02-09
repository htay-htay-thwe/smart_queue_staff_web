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

export default function QueuePie() {
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
          <QueueCircle />
        </CardContent>
        <CardFooter className="justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-green-500 inline-block mr-2"></div>
            <div>Queue Accepted</div>
          </div>
          <div className="">54%</div>
        </CardFooter>
        <div className="flex justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-red-500 inline-block mr-2"></div>
            <div>Queue Canceled</div>
          </div>
          <div className="">54%</div>
        </div>
        <div className="flex justify-between w-full px-4 pt-2">
          <div className="flex">
            <div className="h-3 w-3 mt-1.5 rounded-full bg-blue-500 inline-block mr-2"></div>
            <div>Queue Pending</div>
          </div>
          <div className="">54%</div>
        </div>
      </Card>
    </div>
  );
}
