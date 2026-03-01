import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType = "seat" | "queue" | "complete" | "alert";

export type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type NotiStore = {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "time">,
  ) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
};

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const useNotiStore = create<NotiStore>()(
  persist(
    (set) => ({
      notifications: [],

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: Date.now(),
              read: false,
              time: formatTime(),
              ...notification,
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: "noti-storage",
    },
  ),
);
