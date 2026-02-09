"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, Clock, User, Armchair, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  type: "queue" | "seat" | "complete" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "queue",
    title: "New Queue Assigned",
    message: "Queue A1005 has been assigned to your restaurant",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "complete",
    title: "Queue Completed",
    message: "John Doe (A1004) has completed their dining",
    time: "15 mins ago",
    read: false,
  },
  {
    id: 3,
    type: "seat",
    title: "Seat Available",
    message: "Table 12 is now available for assignment",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "alert",
    title: "Long Wait Time",
    message: "Queue A1002 has been waiting for over 30 minutes",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "queue",
    title: "New Queue Assigned",
    message: "Queue A1003 has been assigned to your restaurant",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "queue",
    title: "New Queue Assigned",
    message: "Queue A1003 has been assigned to your restaurant",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "queue",
    title: "New Queue Assigned",
    message: "Queue A1003 has been assigned to your restaurant",
    time: "3 hours ago",
    read: true,
  },
  
];

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "queue":
        return <User className="w-5 h-5" />;
      case "seat":
        return <Armchair className="w-5 h-5" />;
      case "complete":
        return <CheckCheck className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "queue":
        return "bg-blue-100 text-blue-600";
      case "seat":
        return "bg-green-100 text-green-600";
      case "complete":
        return "bg-purple-100 text-purple-600";
      case "alert":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b bg-linear-to-r from-[#157aa2] to-[#1C7AA5]">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-white text-2xl">Notifications</SheetTitle>
              <SheetDescription className="text-white/80 text-sm mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "You're all caught up!"}
              </SheetDescription>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 text-xs"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Notifications List */}
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No notifications yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  We'll notify you when something arrives
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                    ${
                      notification.read
                        ? "bg-white border-gray-100 hover:border-gray-200"
                        : "bg-blue-50/50 border-blue-200 hover:border-blue-300"
                    }
                  `}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconBg(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`font-semibold text-sm ${
                            notification.read ? "text-gray-700" : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p
                        className={`text-xs mb-2 line-clamp-2 ${
                          notification.read ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
