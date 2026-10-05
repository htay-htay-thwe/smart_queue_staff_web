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
import { BACKEND_SOCKET_URL } from "@/lib/runtime-config";

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
      socketRef.current = io(BACKEND_SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1_000,
        timeout: 15_000,
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
        queryClient.invalidateQueries({ queryKey: ["queueHistory"] });
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

      socketRef.current.on("connect_error", (error) => {
        console.warn("Socket connection failed; queue polling remains active", error.message);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [shopData._id, queryClient]);

  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="min-w-0 w-full bg-slate-50">
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="size-9 rounded-lg hover:bg-slate-100" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Staff workspace</p>
              <p className="text-xs text-slate-500">Manage today’s service</p>
            </div>
          </div>
          <SearchItem onSearch={setSearchQuery} />
        </div>

        <div className="relative min-h-[calc(100vh-4rem)]">
          <div className="pb-24" ref={contentRef}>
            {children}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center border-t border-slate-200/70 px-4 py-6 text-center text-xs text-slate-400">
            <span>© 2026 Smart Queue · Staff management workspace</span>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
