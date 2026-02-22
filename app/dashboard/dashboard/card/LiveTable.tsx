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
import profile from "@/asset/image/default.png";
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
import { useFetchQueue } from "@/hooks/useQueue";
import { useShopStore } from "@/store/shopStore";
import { useState } from "react";

export default function LiveTable() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [timeSort, setTimeSort] = useState<"earliest" | "latest" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();
  const shopData = useShopStore((s) => s.shop);
  const queueUserData = useFetchQueue(shopData._id);
  const queueUsers = queueUserData.data || [];

  const totalPages = Math.ceil(queueUsers.length / itemsPerPage);
  let paginatedQueueUsers = queueUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (statusFilter) {
    paginatedQueueUsers = paginatedQueueUsers.filter(
      (queue) => queue.status.toLowerCase() === statusFilter.toLowerCase(),
    );
  }
  if (timeSort === "earliest") {
    paginatedQueueUsers = [...paginatedQueueUsers].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }
  if (timeSort === "latest") {
    paginatedQueueUsers = [...paginatedQueueUsers].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Live Queue Status</CardTitle>
        <CardAction className="-mt-2">
          <FilterBtn
            setStatusFilter={setStatusFilter}
            setTimeSort={setTimeSort}
          />
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
            {paginatedQueueUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={pathname === "/dashboard/queue" ? 6 : 5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No queue data found
                </TableCell>
              </TableRow>
            ) : (
              paginatedQueueUsers.map((queue, index) => (
                <TableRow
                  key={index}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src={queue.customer_id?.profileImg || profile}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="rounded-full h-full w-full  border border-1 border-[#1E7A9B] object-cover"
                        />
                      </div>
                      <div className="text-base font-medium">
                        {queue.customer_id?.name || "Unknown User"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <div className="mt-1 mr-2">
                        <StatusDot status={queue.status.toLowerCase()} />
                      </div>
                      <div className="text-muted-foreground">
                        {queue.status}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {queue.createdAt
                      ? new Date(queue.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {queue.estimated_wait_time}
                  </TableCell>
                  {pathname === "/dashboard/queue" && (
                    <TableCell className="text-center">
                      <Link href="/dashboard/seat-Place">
                        <Button className="bg-[#1c7aa5] transition-all duration-300 hover:bg-[#297a9f] hover:scale-105">
                          Assign Seat
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      {pathname === "/dashboard/queue" && (
        <CardFooter className="mt-2">
          <div className="items-start">
            <PaginationSeatAssign
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
