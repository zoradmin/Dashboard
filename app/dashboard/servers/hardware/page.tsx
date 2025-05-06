"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function HardwarePage() {
  const [selectedServer, setSelectedServer] = useState("web-01")

  const serverData = {
    "web-01": {
      cpu: {
        usage: 42,
        cores: 4,
        model: "Intel Xeon E5-2680 v4 @ 2.40GHz",
      },
      memory: {
        total: 16,
        used: 6.2,
        swap: {
          total: 4,
          used: 0.5,
        },
      },
      disk: {
        total: 512,
        used: 384,
        mounts: [
          { path: "/", total: 256, used: 180 },
          { path: "/var", total: 128, used: 95 },
          { path: "/home", total: 128, used: 109 },
        ],
      },
      network: {
        interfaces: [
          {
            name: "eth0",
            ip: "192.168.1.101",
            rx: 42,
            tx: 18,
            status: "up",
          },
          {
            name: "eth1",
            ip: "10.0.0.101",
            rx: 5,
            tx: 2,
            status: "up",
          },
        ],
      },
    },
    "db-01": {
      cpu: {
        usage: 65,
        cores: 8,
        model: "Intel Xeon E5-2690 v4 @ 2.60GHz",
      },
      memory: {
        total: 32,
        used: 24.5,
        swap: {
          total: 8,
          used: 1.2,
        },
      },
      disk: {
        total: 1024,
        used: 768,
        mounts: [
          { path: "/", total: 256, used: 180 },
          { path: "/var", total: 512, used: 420 },
          { path: "/home", total: 256, used: 168 },
        ],
      },
      network: {
        interfaces: [
          {
            name: "eth0",
            ip: "192.168.1.102",
            rx: 78,
            tx: 45,
            status: "up",
          },
        ],
      },
    },
    "validator-01": {
      cpu: {
        usage: 85,
        cores: 16,
        model: "AMD EPYC 7302P 16-Core Processor",
      },
      memory: {
        total: 64,
        used: 48.2,
        swap: {
          total: 16,
          used: 2.4,
        },
      },
      disk: {
        total: 2048,
        used: 1536,
        mounts: [
          { path: "/", total: 256, used: 180 },
          { path: "/var", total: 1536, used: 1200 },
          { path: "/home", total: 256, used: 156 },
        ],
      },
      network: {
        interfaces: [
          {
            name: "eth0",
            ip: "192.168.1.103",
            rx: 120,
            tx: 85,
            status: "up",
          },
        ],
      },
    },
    "cache-01": {
      cpu: {
        usage: 35,
        cores: 4,
        model: "Intel Xeon E5-2680 v4 @ 2.40GHz",
      },
      memory: {
        total: 32,
        used: 28.5,
        swap: {
          total: 8,
          used: 0.2,
        },
      },
      disk: {
        total: 512,
        used: 128,
        mounts: [
          { path: "/", total: 256, used: 80 },
          { path: "/var", total: 256, used: 48 },
        ],
      },
      network: {
        interfaces: [
          {
            name: "eth0",
            ip: "192.168.1.104",
            rx: 95,
            tx: 42,
            status: "up",
          },
        ],
      },
    },
  }

  const data = serverData[selectedServer as keyof typeof serverData]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hardware</h1>
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
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>CPU Usage</CardTitle>
                <CardDescription>Current CPU utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{data.cpu.usage}%</div>
                <Progress value={data.cpu.usage} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {data.cpu.cores} cores • {data.cpu.model}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>RAM utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {data.memory.used} / {data.memory.total} GB
                </div>
                <Progress value={(data.memory.used / data.memory.total) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Swap: {data.memory.swap.used} / {data.memory.swap.total} GB
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Disk Usage</CardTitle>
                <CardDescription>Storage utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {data.disk.used} / {data.disk.total} GB
                </div>
                <Progress value={(data.disk.used / data.disk.total) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">{data.disk.mounts.length} mount points</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Network</CardTitle>
                <CardDescription>Network interfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{data.network.interfaces.length}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {data.network.interfaces.map((iface) => (
                    <div key={iface.name} className="mt-1">
                      {iface.name}: {iface.ip} ({iface.status})
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cpu" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>CPU Details</CardTitle>
              <CardDescription>Detailed CPU information for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Model</h3>
                  <p>{data.cpu.model}</p>
                </div>
                <div>
                  <h3 className="font-medium">Cores</h3>
                  <p>{data.cpu.cores} cores</p>
                </div>
                <div>
                  <h3 className="font-medium">Current Usage</h3>
                  <div className="flex items-center space-x-4">
                    <Progress value={data.cpu.usage} className="h-2 flex-1" />
                    <span>{data.cpu.usage}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Memory Details</CardTitle>
              <CardDescription>Detailed memory information for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Physical Memory</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Progress value={(data.memory.used / data.memory.total) * 100} className="h-2 flex-1" />
                    <span>
                      {data.memory.used} / {data.memory.total} GB
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Swap Memory</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Progress value={(data.memory.swap.used / data.memory.swap.total) * 100} className="h-2 flex-1" />
                    <span>
                      {data.memory.swap.used} / {data.memory.swap.total} GB
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disk" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Disk Details</CardTitle>
              <CardDescription>Detailed disk information for {selectedServer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Total Storage</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Progress value={(data.disk.used / data.disk.total) * 100} className="h-2 flex-1" />
                    <span>
                      {data.disk.used} / {data.disk.total} GB
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Mount Points</h3>
                  <div className="space-y-2 mt-2">
                    {data.disk.mounts.map((mount) => (
                      <div key={mount.path}>
                        <div className="flex justify-between text-sm">
                          <span>{mount.path}</span>
                          <span>
                            {mount.used} / {mount.total} GB
                          </span>
                        </div>
                        <Progress value={(mount.used / mount.total) * 100} className="h-2 mt-1" />
                      </div>
                    ))}
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
