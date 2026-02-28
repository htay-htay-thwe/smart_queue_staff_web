import { create } from "zustand";

type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
};

export const useNotiStore = create<{
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
  markAsRead: (id: number) => void;
}>()((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { id: Date.now(), read: false, ...notification },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((noti) =>
        noti.id === id ? { ...noti, read: true } : noti,
      ),
    })),
}));
