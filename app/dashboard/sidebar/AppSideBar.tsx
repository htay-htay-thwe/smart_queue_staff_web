"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Ticket,
  History,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import SmartQLogo from "@/asset/image/Logo.png";
import V from "@/asset/image/v.png";
import { Button } from "@/components/ui/button";
import { shopLogOut } from "@/services/auth.service";

const menuItems = [
  { href: "/dashboard/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/queue", icon: Ticket, label: "Queue" },
  { href: "/dashboard/history", icon: History, label: "History" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/report", icon: FileText, label: "Report" },
];

export default function AppSideBar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const router = require("next/navigation").useRouter();

  return (
    <Sidebar collapsible="icon" className="bg-[#157AA2] border-r-0">
      <SidebarHeader className={isCollapsed ? "p-4" : "p-6 pb-4"}>
        {isCollapsed ? (
          <Image
            src={V}
            alt="Smart Q Logo"
            width={200}
            height={80}
            className="object-fit !w-14 !h-5 transition-all mx-auto"
          />
        ) : (
          <Image
            src={SmartQLogo}
            alt="Smart Q Logo"
            width={200}
            height={80}
            className="object-contain transition-all mx-auto"
          />
        )}
      </SidebarHeader>

      <SidebarContent className={isCollapsed ? "px-0" : "px-4"}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={isCollapsed ? "gap-6" : "gap-2"}>
              <TooltipProvider delayDuration={0}>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className={`
                                ${
                                  isActive
                                    ? "bg-black/30 border-l-4 border-white"
                                    : "border-l-4 border-transparent"
                                }                                     
                              text-white hover:bg-black/20 hover:text-white 
                              ${isCollapsed ? "h-20 w-28 justify-center" : "h-12"} 
                              rounded-lg font-medium 
                              cursor-pointer transition-all duration-200 
                              active:opacity-70 active:scale-95 
                              ${isCollapsed ? "mx-auto" : ""}
                            `}
                            isActive={isActive}
                          >
                            <Link
                              href={item.href}
                              className={
                                isCollapsed ? "" : "flex items-center gap-3"
                              }
                            >
                              <Icon
                                className={
                                  isCollapsed ? "!h-6 !w-6" : "h-5 w-5"
                                }
                              />
                              {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent
                            side="right"
                            className="bg-gray-800 text-white border-gray-700"
                          >
                            <p>{item.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </TooltipProvider>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={isCollapsed ? "p-3" : "p-4 mb-24"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    className={`
                      bg-[#145A6B] text-white hover:bg-[#207393] 
                      hover:text-white rounded-lg font-medium 
                      cursor-pointer transition-all duration-200 
                      active:opacity-70 active:scale-95
                      ${
                        isCollapsed
                          ? "h-20 w-28 mx-auto justify-center"
                          : "h-12 justify-center"
                      }
                    `}
                  >
                    <div
                      onClick={() => {
                        shopLogOut(router)();
                      }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <LogOut
                        className={isCollapsed ? "!h-6 !w-6" : "h-5 w-5"}
                      />
                      {!isCollapsed && <span>Logout</span>}
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="bg-gray-800 text-white border-gray-700"
                  >
                    <p>Logout</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
