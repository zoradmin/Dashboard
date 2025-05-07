"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Download, RefreshCw, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SecurityUpdatesPage() {
  const [selectedServer, setSelectedServer] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)

  const securityUpdates = [
    {
      id: 1,
      name: "OpenSSH Security Update",
      severity: "critical",
      description: "Fixes remote code execution vulnerability in OpenSSH",
      version: "8.9p1-3",
      servers: ["web-01", "db-01", "validator-01", "cache-01"],
      cve: "CVE-2023-38408",
    },
    {
      id: 2,
      name: "Linux Kernel Security Update",
      severity: "high",
      description: "Addresses privilege escalation vulnerability in the kernel",
      version: "5.15.0-78",
      servers: ["web-01", "validator-01"],
      cve: "CVE-2023-4147",
    },
    {
      id: 3,
      name: "OpenSSL Security Update",
      severity: "medium",
      description: "Fixes buffer overflow vulnerability in OpenSSL",
      version: "3.0.8-1",
      servers: ["web-01", "db-01"],
      cve: "CVE-2023-0464",
    },
    {
      id: 4,
      name: "Nginx Security Update",
      severity: "low",
      description: "Addresses HTTP request smuggling vulnerability",
      version: "1.22.1-1",
      servers: ["web-01"],
      cve: "CVE-2023-44487",
    },
  ]

  const filteredUpdates =
    selectedServer === "all"
      ? securityUpdates
      : securityUpdates.filter((update) => update.servers.includes(selectedServer))

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const installUpdates = () => {
    setIsUpdating(true)
    setUpdateProgress(0)

    // Simulate update progress
    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUpdating(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Security Updates</h1>
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
            <CardTitle>Pending Updates</CardTitle>
            <CardDescription>Security updates available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{filteredUpdates.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredUpdates.filter((u) => u.severity === "critical" || u.severity === "high").length} high priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Last Update</CardTitle>
            <CardDescription>Most recent security patch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days ago</div>
            <p className="text-xs text-muted-foreground">PostgreSQL security patch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Security Score</CardTitle>
            <CardDescription>Overall security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">B+</div>
            <p className="text-xs text-muted-foreground">Apply updates to improve</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Auto-Updates</CardTitle>
            <CardDescription>Automatic security patches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Enabled</div>
            <p className="text-xs text-muted-foreground">For critical vulnerabilities</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList>
          <TabsTrigger value="available">Available Updates</TabsTrigger>
          <TabsTrigger value="history">Update History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Available Security Updates</CardTitle>
                <CardDescription>
                  {selectedServer === "all" ? "Updates for all servers" : `Updates for ${selectedServer}`}
                </CardDescription>
              </div>
              <Button onClick={installUpdates} disabled={isUpdating}>
                <Download className="mr-2 h-4 w-4" />
                Install All Updates
              </Button>
            </CardHeader>
            <CardContent>
              {isUpdating && (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Installing updates...</span>
                    <span className="text-sm">{updateProgress}%</span>
                  </div>
                  <Progress value={updateProgress} className="h-2" />
                </div>
              )}

              <div className="rounded-lg border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div>Update</div>
                  <div>Severity</div>
                  <div>Version</div>
                  <div>CVE</div>
                  <div>Servers</div>
                  <div></div>
                </div>
                {filteredUpdates.map((update) => (
                  <div key={update.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                    <div>
                      <div className="font-medium">{update.name}</div>
                      <div className="text-xs text-muted-foreground">{update.description}</div>
                    </div>
                    <div>
                      <Badge variant={getSeverityColor(update.severity)}>
                        {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                      </Badge>
                    </div>
                    <div>{update.version}</div>
                    <div>{update.cve}</div>
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {update.servers.map((server) => (
                          <Badge key={server} variant="outline">
                            {server}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Install</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Update History</CardTitle>
              <CardDescription>Previously installed security updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                  <div>Date</div>
                  <div>Update</div>
                  <div>Servers</div>
                  <div>Status</div>
                  <div>Installed By</div>
                </div>
                {[
                  {
                    date: "3 days ago",
                    update: "PostgreSQL Security Update",
                    servers: ["db-01"],
                    status: "success",
                    user: "system",
                  },
                  {
                    date: "1 week ago",
                    update: "Nginx Security Update",
                    servers: ["web-01"],
                    status: "success",
                    user: "admin",
                  },
                  {
                    date: "2 weeks ago",
                    update: "Linux Kernel Security Update",
                    servers: ["web-01", "db-01", "validator-01", "cache-01"],
                    status: "success",
                    user: "admin",
                  },
                  {
                    date: "1 month ago",
                    update: "OpenSSL Security Update",
                    servers: ["web-01", "db-01"],
                    status: "failed",
                    user: "system",
                  },
                  {
                    date: "1 month ago",
                    update: "OpenSSL Security Update (retry)",
                    servers: ["web-01", "db-01"],
                    status: "success",
                    user: "admin",
                  },
                ].map((history, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                    <div>{history.date}</div>
                    <div>{history.update}</div>
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {history.servers.map((server) => (
                          <Badge key={server} variant="outline">
                            {server}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      {history.status === "success" ? (
                        <Badge className="flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" />
                          Success
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <AlertTriangle className="h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div>{history.user}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Settings</CardTitle>
              <CardDescription>Configure security update behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Automatic Updates</h3>
                      <p className="text-sm text-muted-foreground">Install security updates automatically</p>
                    </div>
                    <Select defaultValue="critical">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Updates</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="none">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Update Schedule</h3>
                      <p className="text-sm text-muted-foreground">When to apply automatic updates</p>
                    </div>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Maintenance Window</h3>
                      <p className="text-sm text-muted-foreground">Time period for scheduled updates</p>
                    </div>
                    <Select defaultValue="night">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (2-6 AM)</SelectItem>
                        <SelectItem value="night">Night (1-5 AM)</SelectItem>
                        <SelectItem value="weekend">Weekend</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Notification Level</h3>
                      <p className="text-sm text-muted-foreground">When to send update notifications</p>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Updates</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Update Source</h3>
                      <p className="text-sm text-muted-foreground">Repository for security updates</p>
                    </div>
                    <Select defaultValue="official">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="official">Official Only</SelectItem>
                        <SelectItem value="extended">Extended Support</SelectItem>
                        <SelectItem value="custom">Custom Repository</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Reboot Policy</h3>
                      <p className="text-sm text-muted-foreground">When to reboot after kernel updates</p>
                    </div>
                    <Select defaultValue="scheduled">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Security Advisories
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Subscribe to security advisories</div>
                    <Select defaultValue="critical">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Advisories</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Email notifications</div>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
