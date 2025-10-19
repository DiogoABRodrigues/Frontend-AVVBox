/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../../config";

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean; // para UI
  readBy: string[]; // para backend
}

interface NotificationsContextType {
  notifications: Notification[];
  markAsRead: (userId: string, notificationId: string) => void;
  refreshNotifications: (fetched: any[], userId: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return; // 🚨 só liga o socket quando user existe

    const socket = io(API_BASE_URL);
    socket.emit("join", user._id);

    socket.on("new-notification", (newNotifications: any[]) => {
      setNotifications((prev) => [
        ...newNotifications.map((n) => ({
          id: n._id,
          title: n.title,
          body: n.body,
          date: new Date(n.date).toLocaleDateString(),
          read: n.readBy?.includes(user._id) ?? false,
          readBy: n.readBy ?? [],
        })),
        ...prev,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]); // 👈 só corre quando user mudar

  const markAsRead = (userId: string, notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId
          ? { ...n, read: true, readBy: [...n.readBy, userId] }
          : n
      )
    );
  };

  const refreshNotifications = (fetched: any[], userId: string) => {
    const formatted = fetched.map((n) => ({
      id: n._id,
      title: n.title,
      body: n.body,
      date: new Date(n.date).toLocaleDateString(),
      read: n.readBy?.includes(userId) ?? false,
      readBy: n.readBy ?? [],
    }));
    setNotifications(formatted);
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, markAsRead, refreshNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  return context;
};
