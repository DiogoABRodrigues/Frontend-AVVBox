import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;      // para UI
  readBy: string[];   // para backend
}

interface NotificationsContextType {
  notifications: Notification[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshNotifications: (fetched: any[], userId: string) => void;
  markAsRead: (userId: string, notificationId: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refreshNotifications = (fetched: any[], userId: string) => {
    const formatted: Notification[] = fetched.map(n => ({
      id: n._id,
      title: n.title,
      body: n.body,
      date: new Date(n.date).toLocaleDateString(),
      read: n.readBy?.includes(userId) ?? false,
      readBy: n.readBy ?? [],
    }));
    setNotifications(formatted);
  };

  const markAsRead = (userId: string, notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, read: true, readBy: [...n.readBy, userId] }
          : n
      )
    );
  };

  return (
    <NotificationsContext.Provider value={{ notifications, refreshNotifications, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotifications must be used within NotificationsProvider");
  return context;
};
