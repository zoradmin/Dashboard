"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotifications } from "@/contexts/notification-context"
import { AlertTriangle, Bell, Cpu, HardDrive, Network, Server } from "lucide-react"

export function NotificationSimulator() {
  const { addNotification } = useNotifications()
  const [server, setServer] = useState("web-01")
  const [severity, setSeverity] = useState<"info" | "warning" | "critical" | "success">("warning")
  const [category, setCategory] = useState("performance")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const handleSimulate = () => {
    if (!title || !message) {
      return
    }

    addNotification({
      title,
      message,
      server,
      severity,
      category,
      link: `/dashboard/monitoring/hardware?server=${server}`,
    })

    // Reset form
    setTitle("")
    setMessage("")
  }

  const handleQuickSimulate = (preset: string) => {
    switch (preset) {
      case "cpu":
        addNotification({
          title: "High CPU Usage",
          message: `CPU usage on ${server} has exceeded 90%`,
          server,
          severity: "warning",
          category: "performance",
          link: `/dashboard/monitoring/hardware?server=${server}`,
        })
        break
      case "disk":
        addNotification({
          title: "Low Disk Space",
          message: `Disk space on ${server} is below 10% free`,
          server,
          severity: "warning",
          category: "storage",
          link: `/dashboard/monitoring/hardware?server=${server}`,
        })
        break
      case "service":
        addNotification({
          title: "Service Down",
          message: `Nginx service is down on ${server}`,
          server,
          severity: "critical",
          category: "services",
          link: `/dashboard/monitoring/services?server=${server}`,
        })
        break
      case "security":
        addNotification({
          title: "Security Alert",
          message: `Multiple failed login attempts detected on ${server}`,
          server,
          severity: "critical",
          category: "security",
          link: `/dashboard/audit/logs?server=${server}`,
        })
        break
      case "network":
        addNotification({
          title: "Network Issue",
          message: `High network latency detected on ${server}`,
          server,
          severity: "warning",
          category: "network",
          link: `/dashboard/monitoring/network?server=${server}`,
        })
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Simulator
        </CardTitle>
        <CardDescription>Test the real-time notification system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="server">Server</Label>
            <Select value={server} onValueChange={setServer}>
              <SelectTrigger id="server">
                <SelectValue placeholder="Select server" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-01">web-01</SelectItem>
                <SelectItem value="db-01">db-01</SelectItem>
                <SelectItem value="validator-01">validator-01</SelectItem>
                <SelectItem value="cache-01">cache-01</SelectItem>
                <SelectItem value="all">All Servers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={(value) => setSeverity(value as any)}>
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="backup">Backup</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Notification title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            placeholder="Notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleSimulate} disabled={!title || !message}>
          Send Custom Notification
        </Button>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
          <Button variant="outline" size="sm" onClick={() => handleQuickSimulate("cpu")}>
            <Cpu className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">CPU</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickSimulate("disk")}>
            <HardDrive className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Disk</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickSimulate("service")}>
            <Server className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Service</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickSimulate("security")}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickSimulate("network")}>
            <Network className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Network</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
