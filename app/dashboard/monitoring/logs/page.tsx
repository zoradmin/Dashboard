"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Filter, Pause, Play, RefreshCw, ScrollText, Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function LogsPage() {
  const searchParams = useSearchParams()
  const serverParam = searchParams.get("server")

  const [selectedServer, setSelectedServer] = useState(serverParam || "web-01")
  const [selectedLog, setSelectedLog] = useState("nginx/access.log")
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const logs = {
    "web-01": [
      { name: "nginx/access.log", size: "2.4 MB", updated: "2 minutes ago" },
      { name: "nginx/error.log", size: "156 KB", updated: "15 minutes ago" },
      { name: "system/syslog", size: "4.2 MB", updated: "1 minute ago" },
      { name: "auth.log", size: "890 KB", updated: "5 minutes ago" },
    ],
    "db-01": [
      { name: "postgresql/postgresql.log", size: "3.1 MB", updated: "3 minutes ago" },
      { name: "system/syslog", size: "2.8 MB", updated: "1 minute ago" },
      { name: "auth.log", size: "750 KB", updated: "8 minutes ago" },
    ],
    "validator-01": [
      { name: "geth/geth.log", size: "8.5 MB", updated: "30 seconds ago" },
      { name: "prysm/validator.log", size: "4.2 MB", updated: "45 seconds ago" },
      { name: "system/syslog", size: "3.2 MB", updated: "1 minute ago" },
      { name: "auth.log", size: "920 KB", updated: "7 minutes ago" },
    ],
    "cache-01": [
      { name: "redis/redis.log", size: "1.8 MB", updated: "4 minutes ago" },
      { name: "memcached/memcached.log", size: "650 KB", updated: "12 minutes ago" },
      { name: "system/syslog", size: "2.1 MB", updated: "2 minutes ago" },
      { name: "auth.log", size: "680 KB", updated: "9 minutes ago" },
    ],
  }

  const logContent = [
    '192.168.1.5 - - [06/May/2025:13:45:10 +0000] "GET /index.html HTTP/1.1" 200 2048 "-" "Mozilla/5.0"',
    '192.168.1.8 - - [06/May/2025:13:45:15 +0000] "GET /css/main.css HTTP/1.1" 200 4096 "-" "Mozilla/5.0"',
    '192.168.1.12 - - [06/May/2025:13:45:22 +0000] "GET /js/app.js HTTP/1.1" 200 8192 "-" "Mozilla/5.0"',
    '192.168.1.15 - - [06/May/2025:13:45:30 +0000] "POST /api/login HTTP/1.1" 401 256 "-" "PostmanRuntime/7.28.4"',
    '192.168.1.15 - - [06/May/2025:13:45:35 +0000] "POST /api/login HTTP/1.1" 200 1024 "-" "PostmanRuntime/7.28.4"',
    '192.168.1.20 - - [06/May/2025:13:45:40 +0000] "GET /images/logo.png HTTP/1.1" 200 16384 "-" "Mozilla/5.0"',
    '192.168.1.25 - - [06/May/2025:13:45:45 +0000] "GET /api/users HTTP/1.1" 403 128 "-" "curl/7.68.0"',
    '192.168.1.30 - - [06/May/2025:13:45:50 +0000] "GET /favicon.ico HTTP/1.1" 404 512 "-" "Mozilla/5.0"',
    '192.168.1.35 - - [06/May/2025:13:45:55 +0000] "GET /admin HTTP/1.1" 301 0 "-" "Mozilla/5.0"',
    '192.168.1.35 - - [06/May/2025:13:46:00 +0000] "GET /admin/ HTTP/1.1" 200 4096 "-" "Mozilla/5.0"',
  ]

  const filteredLogs = searchQuery
    ? logContent.filter((log) => log.toLowerCase().includes(searchQuery.toLowerCase()))
    : logContent

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Logs</h1>
        <div className="flex items-center space-x-2">
          <Select value={selectedServer} onValueChange={setSelectedServer}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select server" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-01">web-01</SelectItem>
              <SelectItem value="db-01">db-01</SelectItem>
              <SelectItem value="validator-01">validator-01</SelectItem>
              <SelectItem value="cache-01">cache-01</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Log Files</CardTitle>
            <CardDescription>Available log files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{logs[selectedServer as keyof typeof logs].length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Size</CardTitle>
            <CardDescription>Combined log size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {logs[selectedServer as keyof typeof logs]
                .reduce((acc, log) => {
                  const size = Number.parseFloat(log.size.split(" ")[0])
                  const unit = log.size.split(" ")[1]
                  return acc + (unit === "MB" ? size * 1024 : size)
                }, 0)
                .toFixed(1)}{" "}
              KB
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Logs</CardTitle>
            <CardDescription>Logs being monitored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">{logs[selectedServer as keyof typeof logs].length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Last Update</CardTitle>
            <CardDescription>Most recent log entry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {
                logs[selectedServer as keyof typeof logs].sort((a, b) => {
                  const aTime = a.updated.includes("second")
                    ? 0
                    : a.updated.includes("minute")
                      ? Number.parseInt(a.updated)
                      : 60
                  const bTime = b.updated.includes("second")
                    ? 0
                    : b.updated.includes("minute")
                      ? Number.parseInt(b.updated)
                      : 60
                  return aTime - bTime
                })[0].updated
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Log Viewer</CardTitle>
              <CardDescription>View and analyze log files</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedLog} onValueChange={setSelectedLog}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select log file" />
                </SelectTrigger>
                <SelectContent>
                  {logs[selectedServer as keyof typeof logs].map((log) => (
                    <SelectItem key={log.name} value={log.name}>
                      {log.name} ({log.size})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={toggleStreaming}>
                {isStreaming ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Stream
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center space-x-2">
                <Switch id="auto-scroll" />
                <Label htmlFor="auto-scroll">Auto-scroll</Label>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedLog}</span>
                </div>
                <Badge variant={isStreaming ? "default" : "outline"}>{isStreaming ? "Live" : "Paused"}</Badge>
              </div>
              <div className="h-[500px] overflow-auto p-4 font-mono text-sm">
                {filteredLogs.map((log, index) => (
                  <div key={index} className="whitespace-nowrap py-1 hover:bg-muted/50">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
