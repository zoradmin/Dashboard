"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Database, Play, RefreshCw, Settings, Square } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const serverParam = searchParams.get("server")

  const [selectedServer, setSelectedServer] = useState(serverParam || "all")
  const [isLoading, setIsLoading] = useState(false)

  const services = [
    {
      id: 1,
      name: "nginx",
      status: "running",
      server: "web-01",
      type: "Web Server",
      uptime: "42 days, 5 hours",
      autostart: true,
      port: 80,
    },
    {
      id: 2,
      name: "postgresql",
      status: "running",
      server: "db-01",
      type: "Database",
      uptime: "38 days, 12 hours",
      autostart: true,
      port: 5432,
    },
    {
      id: 3,
      name: "redis",
      status: "running",
      server: "cache-01",
      type: "Cache",
      uptime: "15 days, 3 hours",
      autostart: true,
      port: 6379,
    },
    {
      id: 4,
      name: "geth",
      status: "warning",
      server: "validator-01",
      type: "Blockchain",
      uptime: "2 days, 8 hours",
      autostart: true,
      port: 8545,
    },
    {
      id: 5,
      name: "prysm",
      status: "running",
      server: "validator-01",
      type: "Blockchain",
      uptime: "2 days, 8 hours",
      autostart: true,
      port: 4000,
    },
    {
      id: 6,
      name: "memcached",
      status: "stopped",
      server: "cache-01",
      type: "Cache",
      uptime: "0",
      autostart: false,
      port: 11211,
    },
  ]

  const filteredServices =
    selectedServer === "all" ? services : services.filter((service) => service.server === selectedServer)

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
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
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
            <CardTitle>Total Services</CardTitle>
            <CardDescription>All managed services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{filteredServices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Running</CardTitle>
            <CardDescription>Active services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">
              {filteredServices.filter((s) => s.status === "running").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Warning</CardTitle>
            <CardDescription>Services with warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-500">
              {filteredServices.filter((s) => s.status === "warning").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Stopped</CardTitle>
            <CardDescription>Inactive services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-500">
              {filteredServices.filter((s) => s.status === "stopped").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="web">Web Servers</TabsTrigger>
          <TabsTrigger value="db">Databases</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="cache">Cache</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Services</CardTitle>
              <CardDescription>
                {selectedServer === "all" ? "Services across all servers" : `Services on ${selectedServer}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Database className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{service.name}</h3>
                          <Badge
                            variant={
                              service.status === "running"
                                ? "default"
                                : service.status === "warning"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {service.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {service.server} • {service.type} • Port: {service.port}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.status === "running" ? (
                        <Button variant="outline" size="sm">
                          <Square className="mr-2 h-4 w-4" />
                          Stop
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restart
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="web" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Web Servers</CardTitle>
              <CardDescription>Web server services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredServices
                  .filter((service) => service.type === "Web Server")
                  .map((service) => (
                    <div key={service.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Database className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{service.name}</h3>
                            <Badge
                              variant={
                                service.status === "running"
                                  ? "default"
                                  : service.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {service.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {service.server} • {service.type} • Port: {service.port}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {service.status === "running" ? (
                          <Button variant="outline" size="sm">
                            <Square className="mr-2 h-4 w-4" />
                            Stop
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Start
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Restart
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="db" className="mt-4">
          {/* Similar content for database services */}
        </TabsContent>
        <TabsContent value="blockchain" className="mt-4">
          {/* Similar content for blockchain services */}
        </TabsContent>
        <TabsContent value="cache" className="mt-4">
          {/* Similar content for cache services */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
