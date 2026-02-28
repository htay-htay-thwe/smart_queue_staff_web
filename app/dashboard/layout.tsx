"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "./sidebar/AppSideBar";
import SearchItem from "./sidebar/SeachItem";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useShopStore } from "@/store/shopStore";
import { useNotiStore } from "@/store/notiStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shopData = useShopStore((s) => s.shop);
  const addNotification = useNotiStore((s) => s.addNotification);
  console.log("Shop data in DashboardLayout:", shopData._id);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!shopData?._id) return;

    if (!socketRef.current) {
      socketRef.current = io("https://smart-q-backend-nestjs.onrender.com", {
        transports: ["websocket"],
      });

      // Debug: Log all incoming events
      socketRef.current.onAny((event, ...args) => {
        console.log("[Socket] Event:", event, args);
      });

      socketRef.current.on("connect", () => {
        console.log("Connected:", socketRef.current?.id);
        socketRef.current?.emit("events", shopData._id.toString());
      });

      socketRef.current.on("freeTable", (data) => {
        console.log("Received freeTable:", data);

        addNotification({
          title: "One Table is Free",
          message: data.message,
        });
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      // DO NOT disconnect here
      // Let socket live during app lifetime
    };
  }, [shopData._id]);

  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full">
        <div className="p-4 justify-between flex items-center border-b bg-white sticky top-0 z-10 shadow-sm">
          <SidebarTrigger className="hover:bg-gray-100 " />
          <SearchItem />
        </div>

        <div className="relative min-h-[calc(100vh-64px)]">
          <div className="pb-20">{children}</div>

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
