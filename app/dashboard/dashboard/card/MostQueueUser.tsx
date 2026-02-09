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
import Image from "next/image";
import profile from "@/asset/image/profile.jpg";

const data = [
  {
    name: "John Doe",
    totalQueues: 15,
  },
  {
    name: "John Doe",
    totalQueues: 15,
  },
  {
    name: "John Doe",
    totalQueues: 15,
  },
    {
    name: "John Doe",
    totalQueues: 15,
  },
    {
    name: "John Doe",
    totalQueues: 15,
  },
];

export default function MostQueueUser() {
  return (
    <div className="group">
      <Card className="w-full gap-1 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <CardHeader className="mb-3">
          <CardTitle>Most Queued Users</CardTitle>
        </CardHeader>
        {data.map((user, index) => (
          <CardContent key={index} className="pt-2 flex gap-5 mt-2 transition-all duration-200 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Image
              src={profile}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full border"
            />
            <div>
              <div className="text-base font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">
                Total Queues: {user.totalQueues}
              </div>
            </div>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
