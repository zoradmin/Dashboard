"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export type NotificationSeverity = "info" | "warning" | "critical" | "success"

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  server: string
  severity: NotificationSeverity
  category: string
  link?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  deleteNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.severity === "critical" ? "destructive" : "default",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    // Initial notifications
    const initialNotifications: Omit<Notification, "id" | "timestamp" | "read">[] = [
      {
        title: "CPU Usage Alert",
        message: "CPU usage on validator-01 exceeds 90%",
        server: "validator-01",
        severity: "critical",
        category: "performance",
        link: "/dashboard/monitoring/hardware?server=validator-01",
      },
      {
        title: "Security Update Available",
        message: "Critical security updates available for all servers",
        server: "all",
        severity: "warning",
        category: "security",
        link: "/dashboard/security/updates",
      },
      {
        title: "Disk Space Warning",
        message: "Disk space on web-01 is below 10% free",
        server: "web-01",
        severity: "warning",
        category: "storage",
        link: "/dashboard/monitoring/hardware?server=web-01",
      },
    ]

    // Add initial notifications
    initialNotifications.forEach((notification) => {
      addNotification(notification)
    })

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const randomEvents = [
        {
          title: "Service Restarted",
          message: "Nginx service automatically restarted on web-01",
          server: "web-01",
          severity: "info" as NotificationSeverity,
          category: "services",
          link: "/dashboard/monitoring/services?server=web-01",
        },
        {
          title: "Failed Login Attempt",
          message: "Multiple failed login attempts detected on db-01",
          server: "db-01",
          severity: "warning" as NotificationSeverity,
          category: "security",
          link: "/dashboard/audit/logs?server=db-01",
        },
        {
          title: "Backup Completed",
          message: "Scheduled backup completed successfully on all servers",
          server: "all",
          severity: "success" as NotificationSeverity,
          category: "backup",
        },
        {
          title: "Network Latency Spike",
          message: "Network latency spike detected on cache-01",
          server: "cache-01",
          severity: "warning" as NotificationSeverity,
          category: "network",
          link: "/dashboard/monitoring/network?server=cache-01",
        },
      ]

      // Randomly decide whether to add a notification (30% chance)
      if (Math.random() < 0.3) {
        const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)]
        addNotification(randomEvent)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
