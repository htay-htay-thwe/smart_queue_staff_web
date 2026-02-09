"use client";

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
import FilterBtn from "./FilterBtn";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import PaginationSeatAssign from "../../queue/card/PaginationSeatAssign";

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
  const pathname = usePathname();

  return (
    <Card className="transition-all duration-300 hover:shadow-xl">
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
              <TableHead className="w-25">No.</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time Queued</TableHead>
              <TableHead className="text-right">Estimated Time</TableHead>
              {pathname === "/dashboard/queue" && (
                <TableHead className="text-center">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.map((user, index) => (
              <TableRow key={index} className="transition-all duration-200 hover:bg-gray-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8">
                    <Image
                      src={profile}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full h-full w-full  border"
                    />
                    </div>
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
                {pathname === "/dashboard/queue" && (
                  <TableCell className="text-center">
                    <Link href="/dashboard/seat-Place">
                      <Button className="bg-[#1c7aa5] transition-all duration-300 hover:bg-[#297a9f] hover:scale-105">Assign Seat</Button>
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {pathname === "/dashboard/queue" && (
        <CardFooter className="mt-2">
          <div className="items-start">
            <PaginationSeatAssign />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
