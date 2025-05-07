"use client"

import { useNotifications, type Notification } from "@/contexts/notification-context"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, CheckCircle, Info, Server, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: Notification
  inDropdown?: boolean
}

export function NotificationItem({ notification, inDropdown = false }: NotificationItemProps) {
  const { markAsRead, deleteNotification } = useNotifications()
  const router = useRouter()

  const handleClick = () => {
    markAsRead(notification.id)
    if (notification.link) {
      router.push(notification.link)
    }
  }

  const getSeverityIcon = () => {
    switch (notification.severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityColor = () => {
    switch (notification.severity) {
      case "critical":
        return "border-l-destructive"
      case "warning":
        return "border-l-amber-500"
      case "success":
        return "border-l-green-500"
      default:
        return "border-l-blue-500"
    }
  }

  if (inDropdown) {
    return (
      <div
        className={cn(
          "flex cursor-pointer items-start gap-3 border-l-4 px-4 py-3 hover:bg-muted/50",
          getSeverityColor(),
          !notification.read && "bg-muted/30",
        )}
        onClick={handleClick}
      >
        <div className="mt-1">{getSeverityIcon()}</div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between">
            <p className="font-medium leading-none">{notification.title}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 -mr-1 -mt-1"
              onClick={(e) => {
                e.stopPropagation()
                deleteNotification(notification.id)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Server className="h-3 w-3" />
              <span>{notification.server === "all" ? "All Servers" : notification.server}</span>
            </div>
            <span className="text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-lg border border-l-4 p-4 hover:bg-muted/50",
        getSeverityColor(),
        !notification.read && "bg-muted/30",
      )}
      onClick={handleClick}
    >
      <div className="mt-1">{getSeverityIcon()}</div>
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium">{notification.title}</p>
            <p className="text-muted-foreground">{notification.message}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mr-2 -mt-2"
            onClick={(e) => {
              e.stopPropagation()
              deleteNotification(notification.id)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Server className="h-4 w-4" />
              <span>{notification.server === "all" ? "All Servers" : notification.server}</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {notification.category}
            </Badge>
          </div>
          <span className="text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}
