"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownUp, Globe, Network, RefreshCw, Shield } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function NetworkPage() {
  const searchParams = useSearchParams()
  const serverParam = searchParams.get("server")

  const [selectedServer, setSelectedServer] = useState(serverParam || "web-01")
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState<Record<string, Record<string, string>>>({})

  const networkData = {
    "web-01": {
      interfaces: [
        {
          name: "eth0",
          ip: "192.168.1.101",
          mac: "00:1A:2B:3C:4D:5E",
          status: "up",
          rx: 42,
          tx: 18,
          subnet: "255.255.255.0",
          gateway: "192.168.1.1",
        },
        {
          name: "eth1",
          ip: "10.0.0.101",
          mac: "00:1A:2B:3C:4D:5F",
          status: "up",
          rx: 5,
          tx: 2,
          subnet: "255.255.255.0",
          gateway: "10.0.0.1",
        },
      ],
      firewall: {
        enabled: true,
        rules: [
          { port: 22, protocol: "TCP", source: "Any", action: "Allow", description: "SSH" },
          { port: 80, protocol: "TCP", source: "Any", action: "Allow", description: "HTTP" },
          { port: 443, protocol: "TCP", source: "Any", action: "Allow", description: "HTTPS" },
          { port: 3306, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "MySQL" },
        ],
      },
      dns: {
        primary: "8.8.8.8",
        secondary: "8.8.4.4",
        domain: "example.com",
      },
    },
    "db-01": {
      interfaces: [
        {
          name: "eth0",
          ip: "192.168.1.102",
          mac: "00:2A:3B:4C:5D:6E",
          status: "up",
          rx: 78,
          tx: 45,
          subnet: "255.255.255.0",
          gateway: "192.168.1.1",
        },
      ],
      firewall: {
        enabled: true,
        rules: [
          { port: 22, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "SSH" },
          { port: 5432, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "PostgreSQL" },
        ],
      },
      dns: {
        primary: "8.8.8.8",
        secondary: "8.8.4.4",
        domain: "db.example.com",
      },
    },
    "validator-01": {
      interfaces: [
        {
          name: "eth0",
          ip: "192.168.1.103",
          mac: "00:3A:4B:5C:6D:7E",
          status: "up",
          rx: 120,
          tx: 85,
          subnet: "255.255.255.0",
          gateway: "192.168.1.1",
        },
      ],
      firewall: {
        enabled: true,
        rules: [
          { port: 22, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "SSH" },
          { port: 8545, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "Ethereum JSON-RPC" },
          { port: 30303, protocol: "TCP/UDP", source: "Any", action: "Allow", description: "Ethereum P2P" },
        ],
      },
      dns: {
        primary: "8.8.8.8",
        secondary: "8.8.4.4",
        domain: "validator.example.com",
      },
    },
    "cache-01": {
      interfaces: [
        {
          name: "eth0",
          ip: "192.168.1.104",
          mac: "00:4A:5B:6C:7D:8E",
          status: "up",
          rx: 95,
          tx: 42,
          subnet: "255.255.255.0",
          gateway: "192.168.1.1",
        },
      ],
      firewall: {
        enabled: true,
        rules: [
          { port: 22, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "SSH" },
          { port: 6379, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "Redis" },
          { port: 11211, protocol: "TCP", source: "192.168.1.0/24", action: "Allow", description: "Memcached" },
        ],
      },
      dns: {
        primary: "8.8.8.8",
        secondary: "8.8.4.4",
        domain: "cache.example.com",
      },
    },
  }

  const data = networkData[selectedServer as keyof typeof networkData]

  // Initialize form state when server changes
  useState(() => {
    const initialState: Record<string, Record<string, string>> = {}

    // Initialize interface form state
    data.interfaces.forEach((iface) => {
      initialState[iface.name] = {
        ip: iface.ip,
        subnet: iface.subnet,
        gateway: iface.gateway,
        mac: iface.mac,
      }
    })

    // Initialize DNS form state
    initialState.dns = {
      primary: data.dns.primary,
      secondary: data.dns.secondary,
      domain: data.dns.domain,
    }

    setFormState(initialState)
  })

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Network</h1>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Interfaces</CardTitle>
            <CardDescription>Network interfaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{data.interfaces.length}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {data.interfaces.map((iface) => (
                <div key={iface.name} className="mt-1">
                  {iface.name}: {iface.ip} ({iface.status})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Firewall</CardTitle>
            <CardDescription>Firewall status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {data.firewall.enabled ? (
                <span className="text-green-500">Enabled</span>
              ) : (
                <span className="text-red-500">Disabled</span>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-2">{data.firewall.rules.length} active rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>DNS</CardTitle>
            <CardDescription>DNS configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{data.dns.domain}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Primary: {data.dns.primary}
              <br />
              Secondary: {data.dns.secondary}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="interfaces" className="w-full">
        <TabsList>
          <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
          <TabsTrigger value="firewall">Firewall</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>
        <TabsContent value="interfaces" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Interfaces</CardTitle>
              <CardDescription>Configure network interfaces for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.interfaces.map((iface) => (
                  <div key={iface.name} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">{iface.name}</h3>
                        <Badge variant={iface.status === "up" ? "default" : "destructive"}>{iface.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ArrowDownUp className="h-3 w-3" />
                          RX: {iface.rx} Mbps / TX: {iface.tx} Mbps
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${iface.name}-ip`}>IP Address</Label>
                        <Input
                          id={`${iface.name}-ip`}
                          defaultValue={iface.ip}
                          onChange={(e) => handleInputChange(iface.name, "ip", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${iface.name}-subnet`}>Subnet Mask</Label>
                        <Input
                          id={`${iface.name}-subnet`}
                          defaultValue={iface.subnet}
                          onChange={(e) => handleInputChange(iface.name, "subnet", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${iface.name}-gateway`}>Gateway</Label>
                        <Input
                          id={`${iface.name}-gateway`}
                          defaultValue={iface.gateway}
                          onChange={(e) => handleInputChange(iface.name, "gateway", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${iface.name}-mac`}>MAC Address</Label>
                        <Input id={`${iface.name}-mac`} defaultValue={iface.mac} readOnly />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="firewall" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Firewall Rules</CardTitle>
              <CardDescription>Manage firewall rules for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Firewall Status</h3>
                  </div>
                  <Button variant={data.firewall.enabled ? "default" : "destructive"}>
                    {data.firewall.enabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Port</div>
                    <div>Protocol</div>
                    <div>Source</div>
                    <div>Action</div>
                    <div>Description</div>
                    <div></div>
                  </div>
                  {data.firewall.rules.map((rule, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                      <div>{rule.port}</div>
                      <div>{rule.protocol}</div>
                      <div>{rule.source}</div>
                      <div>
                        <Badge variant={rule.action === "Allow" ? "default" : "destructive"}>{rule.action}</Badge>
                      </div>
                      <div>{rule.description}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Shield className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button>Add Rule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>DNS Configuration</CardTitle>
              <CardDescription>Manage DNS settings for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-dns">Primary DNS</Label>
                    <Input
                      id="primary-dns"
                      defaultValue={data.dns.primary}
                      onChange={(e) => handleInputChange("dns", "primary", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-dns">Secondary DNS</Label>
                    <Input
                      id="secondary-dns"
                      defaultValue={data.dns.secondary}
                      onChange={(e) => handleInputChange("dns", "secondary", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      defaultValue={data.dns.domain}
                      onChange={(e) => handleInputChange("dns", "domain", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traffic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>Monitor network traffic for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Traffic Overview</h3>
                  </div>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last hour</SelectItem>
                      <SelectItem value="24h">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-80 rounded-lg border p-4 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Network traffic visualization would appear here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
