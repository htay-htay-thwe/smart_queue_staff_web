import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import profile from "@/asset/image/profile.jpg";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import FilterBtn from "./FilterBtn";

const user = [
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
  {
    name: "John Doe",
    status: "Dining",
    timeQueued: "10:30 AM",
    estimatedTime: "15 mins",
  },
];

export default function LiveTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Live Queue Status</CardTitle>
        <CardAction className="-mt-2">
          <FilterBtn />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time Queued</TableHead>
              <TableHead className="text-right">Estimated Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={profile}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full  border"
                    />
                    <div className="text-base font-medium">{user.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <div className="mt-1 mr-2">
                      <StatusDot status="pending" />
                    </div>
                    <div className="text-muted-foreground">{user.status}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {user.timeQueued}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {user.estimatedTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
