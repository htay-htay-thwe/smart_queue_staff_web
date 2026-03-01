"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "./sidebar/AppSideBar";
import SearchItem from "./sidebar/SeachItem";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useShopStore } from "@/store/shopStore";
import { useNotiStore } from "@/store/notiStore";
import { useQueryClient } from "@tanstack/react-query";
import Mark from "mark.js";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shopData = useShopStore((s) => s.shop);
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!contentRef.current) return;
    const markInstance = new Mark(contentRef.current);
    markInstance.unmark({
      done: () => {
        if (searchQuery.trim()) {
          markInstance.mark(searchQuery.trim(), {
            separateWordSearch: false,
            className: "bg-yellow-300 text-black rounded px-0.5",
            done: () => {
              const firstMark = contentRef.current?.querySelector("mark");
              if (firstMark) {
                firstMark.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            },
          });
        }
      },
    });
  }, [searchQuery]);

  useEffect(() => {
    if (!shopData?._id) return;

    if (!socketRef.current) {
      socketRef.current = io("https://smart-q-backend-nestjs.onrender.com", {
        transports: ["websocket"],
      });

      // Debug: Log all incoming events
      socketRef.current.onAny((event, ...args) => {
        console.log(" backend", event, args);
      });

      socketRef.current.on("connect", () => {
        console.log("Connected:", socketRef.current?.id);
        socketRef.current?.emit("events", shopData._id.toString());
      });

      socketRef.current.on("freeTable", (data) => {
        console.log("Received freeTable:", data);

        const table_type_name = data?.table_type_name ?? null;

        // Read fresh addNotification from store to avoid stale closure
        useNotiStore.getState().addNotification({
          type: "seat",
          title: "One Table is Free",
          message: table_type_name
            ? `A <strong>${table_type_name}</strong> table has been freed. Please check the queue.`
            : "A table has been freed. Please check the queue status.",
        });

        queryClient.invalidateQueries({ queryKey: ["queue"] });
        queryClient.invalidateQueries({ queryKey: ["occupyTable"] });
      });

      socketRef.current.on("newCustomerQueue", (data) => {
        console.log("Received newCustomerQueue:", data);

        const table_type_name = data?.table_type_name ?? null;

        // Read fresh addNotification from store to avoid stale closure
        useNotiStore.getState().addNotification({
          type: "queue",
          title: "New Queue Customer in Queue",
          message: table_type_name
            ? `A customer has joined the <strong>${table_type_name}</strong> table queue. Please check the queue status.`
            : "A customer has joined the queue. Please check the queue status.",
        });

        queryClient.invalidateQueries({ queryKey: ["queue"] });
        queryClient.invalidateQueries({ queryKey: ["occupyTable"] });
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      // DO NOT disconnect here
      // Let socket live during app lifetime
    };
  }, [shopData._id, queryClient]);

  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full">
        <div className="p-4 justify-between flex items-center border-b bg-white sticky top-0 z-10 shadow-sm">
          <SidebarTrigger className="hover:bg-gray-100 " />
          <SearchItem onSearch={setSearchQuery} />
        </div>

        <div className="relative min-h-[calc(100vh-64px)]">
          <div className="pb-20" ref={contentRef}>
            {children}
          </div>

          {/* Footer */}
          <div className="absolute  bottom-0 left-0 right-0 flex items-center justify-center p-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-5">
              <span>Smart Queue System © 2026 smart queue, Inc.</span>
              <span className="h-4 w-px bg-gray-300" />
              <span>Community guidelines · Terms of service</span>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
