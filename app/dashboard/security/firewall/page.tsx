"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, RefreshCw, Shield, Trash } from "lucide-react"

export default function FirewallPage() {
  const [selectedServer, setSelectedServer] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const firewallRules = [
    { id: 1, port: 22, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "SSH", server: "all" },
    { id: 2, port: 80, protocol: "TCP", source: "Any", action: "Allow", description: "HTTP", server: "web-01" },
    { id: 3, port: 443, protocol: "TCP", source: "Any", action: "Allow", description: "HTTPS", server: "web-01" },
    {
      id: 4,
      port: 5432,
      protocol: "TCP",
      source: "192.168.1.0/24",
      action: "Allow",
      description: "PostgreSQL",
      server: "db-01",
    },
    {
      id: 5,
      port: 6379,
      protocol: "TCP",
      source: "192.168.1.0/24",
      action: "Allow",
      description: "Redis",
      server: "cache-01",
    },
    {
      id: 6,
      port: 8545,
      protocol: "TCP",
      source: "192.168.1.0/24",
      action: "Allow",
      description: "Ethereum JSON-RPC",
      server: "validator-01",
    },
    {
      id: 7,
      port: 30303,
      protocol: "TCP/UDP",
      source: "Any",
      action: "Allow",
      description: "Ethereum P2P",
      server: "validator-01",
    },
  ]

  const filteredRules =
    selectedServer === "all"
      ? firewallRules
      : firewallRules.filter((rule) => rule.server === selectedServer || rule.server === "all")

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
        <h1 className="text-3xl font-bold tracking-tight">Firewall Management</h1>
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
            <CardTitle>Firewall Status</CardTitle>
            <CardDescription>Current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Active</div>
            <p className="text-xs text-muted-foreground">All servers protected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Rules</CardTitle>
            <CardDescription>Active firewall rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredRules.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {selectedServer === "all" ? "all servers" : selectedServer}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Last Attack</CardTitle>
            <CardDescription>Most recent blocked attempt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 min ago</div>
            <p className="text-xs text-muted-foreground">From 185.143.223.78</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Security Level</CardTitle>
            <CardDescription>Current protection level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">Medium</div>
            <p className="text-xs text-muted-foreground">Recommended: High</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules">Firewall Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Firewall Rules</CardTitle>
                <CardDescription>
                  {selectedServer === "all" ? "Rules across all servers" : `Rules for ${selectedServer}`}
                </CardDescription>
              </div>
              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div>Server</div>
                  <div>Port</div>
                  <div>Protocol</div>
                  <div>Source</div>
                  <div>Action</div>
                  <div>Description</div>
                  <div></div>
                </div>
                {filteredRules.map((rule) => (
                  <div key={rule.id} className="grid grid-cols-7 gap-4 p-4 border-b last:border-0">
                    <div>{rule.server === "all" ? "All Servers" : rule.server}</div>
                    <div>{rule.port}</div>
                    <div>{rule.protocol}</div>
                    <div>{rule.source}</div>
                    <div>
                      <Badge variant={rule.action === "Allow" ? "default" : "destructive"}>{rule.action}</Badge>
                    </div>
                    <div>{rule.description}</div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Firewall Settings</CardTitle>
              <CardDescription>Configure firewall behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Firewall Status</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable the firewall</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Default Policy</Label>
                    <p className="text-sm text-muted-foreground">Action for traffic not matching any rule</p>
                  </div>
                  <Select defaultValue="deny">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allow">Allow</SelectItem>
                      <SelectItem value="deny">Deny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Security Level</Label>
                    <p className="text-sm text-muted-foreground">Predefined security configurations</p>
                  </div>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">IP Blocking</Label>
                    <p className="text-sm text-muted-foreground">Automatically block suspicious IPs</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Advanced Settings
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="connection-tracking">Connection Tracking</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger id="connection-tracking">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="warning">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Firewall Logs</CardTitle>
              <CardDescription>Recent firewall activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                  <div>Time</div>
                  <div>Server</div>
                  <div>Source IP</div>
                  <div>Action</div>
                  <div>Details</div>
                </div>
                {[
                  {
                    time: "10 min ago",
                    server: "web-01",
                    ip: "185.143.223.78",
                    action: "Block",
                    details: "Port scan attempt",
                  },
                  {
                    time: "25 min ago",
                    server: "db-01",
                    ip: "103.235.46.19",
                    action: "Block",
                    details: "SSH brute force",
                  },
                  {
                    time: "1 hour ago",
                    server: "validator-01",
                    ip: "45.227.255.206",
                    action: "Block",
                    details: "Invalid packet",
                  },
                  {
                    time: "2 hours ago",
                    server: "web-01",
                    ip: "192.168.1.5",
                    action: "Allow",
                    details: "SSH connection",
                  },
                  {
                    time: "3 hours ago",
                    server: "cache-01",
                    ip: "192.168.1.10",
                    action: "Allow",
                    details: "Redis connection",
                  },
                ].map((log, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                    <div>{log.time}</div>
                    <div>{log.server}</div>
                    <div>{log.ip}</div>
                    <div>
                      <Badge variant={log.action === "Allow" ? "default" : "destructive"}>{log.action}</Badge>
                    </div>
                    <div>{log.details}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
