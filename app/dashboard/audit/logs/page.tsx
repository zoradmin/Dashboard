"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Filter, RefreshCw, Search, User } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function AuditLogsPage() {
  const [selectedServer, setSelectedServer] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-05-06 13:45:10",
      user: "admin",
      action: "login",
      resource: "system",
      server: "web-01",
      ip: "192.168.1.5",
      status: "success",
    },
    {
      id: 2,
      timestamp: "2025-05-06 13:50:22",
      user: "admin",
      action: "file_modify",
      resource: "/etc/nginx/nginx.conf",
      server: "web-01",
      ip: "192.168.1.5",
      status: "success",
    },
    {
      id: 3,
      timestamp: "2025-05-06 14:05:33",
      user: "system",
      action: "service_restart",
      resource: "nginx",
      server: "web-01",
      ip: "localhost",
      status: "success",
    },
    {
      id: 4,
      timestamp: "2025-05-06 14:30:45",
      user: "john.doe",
      action: "login",
      resource: "system",
      server: "db-01",
      ip: "192.168.1.10",
      status: "failed",
    },
    {
      id: 5,
      timestamp: "2025-05-06 14:31:15",
      user: "john.doe",
      action: "login",
      resource: "system",
      server: "db-01",
      ip: "192.168.1.10",
      status: "success",
    },
    {
      id: 6,
      timestamp: "2025-05-06 14:45:30",
      user: "john.doe",
      action: "database_query",
      resource: "users_table",
      server: "db-01",
      ip: "192.168.1.10",
      status: "success",
    },
    {
      id: 7,
      timestamp: "2025-05-06 15:10:05",
      user: "system",
      action: "security_update",
      resource: "kernel",
      server: "validator-01",
      ip: "localhost",
      status: "success",
    },
    {
      id: 8,
      timestamp: "2025-05-06 15:30:12",
      user: "jane.smith",
      action: "file_access",
      resource: "/var/log/auth.log",
      server: "cache-01",
      ip: "192.168.1.15",
      status: "success",
    },
  ]

  const filteredLogs = selectedServer === "all" ? auditLogs : auditLogs.filter((log) => log.server === selectedServer)

  const searchedLogs = searchQuery
    ? filteredLogs.filter((log) =>
        Object.values(log).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : filteredLogs

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <div className="flex items-center space-x-2">
          <Select value={selectedServer} onValueChange={setSelectedServer}>
            <SelectTrigger className="w-[180px]">
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
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Events</CardTitle>
            <CardDescription>Audit events recorded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">In selected time period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Actions</CardTitle>
            <CardDescription>Actions by users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.filter((log) => log.user !== "system").length}</div>
            <p className="text-xs text-muted-foreground">Manual operations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Actions</CardTitle>
            <CardDescription>Automated operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.filter((log) => log.user === "system").length}</div>
            <p className="text-xs text-muted-foreground">Automated processes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Failed Actions</CardTitle>
            <CardDescription>Unsuccessful operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {filteredLogs.filter((log) => log.status === "failed").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Audit Log Events</CardTitle>
              <CardDescription>
                {selectedServer === "all" ? "Events across all servers" : `Events for ${selectedServer}`}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DatePickerWithRange className="w-full sm:w-auto" />
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="login">Login Events</TabsTrigger>
                <TabsTrigger value="file">File Operations</TabsTrigger>
                <TabsTrigger value="service">Service Operations</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                    <div>Time</div>
                    <div>User</div>
                    <div>Action</div>
                    <div>Resource</div>
                    <div>Server</div>
                    <div>IP</div>
                    <div>Status</div>
                  </div>
                  <div className="max-h-[500px] overflow-auto">
                    {searchedLogs.map((log) => (
                      <div key={log.id} className="grid grid-cols-7 gap-4 p-4 border-b last:border-0">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {log.timestamp}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          {log.user}
                        </div>
                        <div>{log.action.replace("_", " ")}</div>
                        <div className="truncate" title={log.resource}>
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground inline-block" />
                          {log.resource}
                        </div>
                        <div>{log.server}</div>
                        <div>{log.ip}</div>
                        <div>
                          <Badge variant={log.status === "success" ? "default" : "destructive"}>{log.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="login" className="mt-4">
                {/* Similar content filtered for login events */}
              </TabsContent>
              <TabsContent value="file" className="mt-4">
                {/* Similar content filtered for file operations */}
              </TabsContent>
              <TabsContent value="service" className="mt-4">
                {/* Similar content filtered for service operations */}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
