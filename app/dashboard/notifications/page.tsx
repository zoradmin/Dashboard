"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Filter, RefreshCw, Search, Trash } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import { NotificationItem } from "@/components/notifications/notification-item"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications()
  const [selectedServer, setSelectedServer] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Filter notifications based on selected criteria
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by server
    if (selectedServer !== "all" && notification.server !== selectedServer && notification.server !== "all") {
      return false
    }

    // Filter by severity
    if (selectedSeverity !== "all" && notification.severity !== selectedSeverity) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Count notifications by severity
  const criticalCount = notifications.filter((n) => n.severity === "critical").length
  const warningCount = notifications.filter((n) => n.severity === "warning").length
  const infoCount = notifications.filter((n) => n.severity === "info").length
  const successCount = notifications.filter((n) => n.severity === "success").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={clearNotifications} disabled={notifications.length === 0}>
            <Trash className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>Total alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Critical</CardTitle>
            <CardDescription>High priority alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Warnings</CardTitle>
            <CardDescription>Medium priority alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Require attention soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Info & Success</CardTitle>
            <CardDescription>Low priority alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{infoCount + successCount}</div>
            <p className="text-xs text-muted-foreground">Informational updates</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Center
              </CardTitle>
              <CardDescription>Real-time alerts and notifications from your servers</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DatePickerWithRange className="w-full sm:w-auto" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedServer} onValueChange={setSelectedServer}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Servers</SelectItem>
                    <SelectItem value="web-01">web-01</SelectItem>
                    <SelectItem value="db-01">db-01</SelectItem>
                    <SelectItem value="validator-01">validator-01</SelectItem>
                    <SelectItem value="cache-01">cache-01</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4 space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No notifications found</h3>
                    <p className="text-muted-foreground">No notifications match your current filters.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="unread" className="mt-4 space-y-4">
                {filteredNotifications.filter((n) => !n.read).length > 0 ? (
                  filteredNotifications
                    .filter((n) => !n.read)
                    .map((notification) => <NotificationItem key={notification.id} notification={notification} />)
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No unread notifications</h3>
                    <p className="text-muted-foreground">You've read all your notifications.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="critical" className="mt-4 space-y-4">
                {filteredNotifications.filter((n) => n.severity === "critical").length > 0 ? (
                  filteredNotifications
                    .filter((n) => n.severity === "critical")
                    .map((notification) => <NotificationItem key={notification.id} notification={notification} />)
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No critical notifications</h3>
                    <p className="text-muted-foreground">All systems are operating normally.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="warning" className="mt-4 space-y-4">
                {/* Similar content for warning notifications */}
              </TabsContent>
              <TabsContent value="info" className="mt-4 space-y-4">
                {/* Similar content for info notifications */}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
