import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "user" | "course" | "payment" | "enrollment";
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "time" | "unread">) => void;
  deleteNotification: (id: number) => void;
}

const initialNotifications: Notification[] = [];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const addNotification = (notification: Omit<Notification, "id" | "time" | "unread">) => {
    const newNotif: Notification = {
      ...notification,
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      time: "Just now",
      unread: true,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      addNotification,
      deleteNotification 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}