"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "./sidebar/AppSideBar";
import SearchItem from "./sidebar/SeachItem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
