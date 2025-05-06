import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Server, Settings } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchBar } from "@/components/search-bar"

export default function ServersPage() {
  const servers = [
    {
      id: 1,
      name: "web-01",
      ip: "192.168.1.101",
      status: "online",
      type: "Web Server",
      location: "US East",
      services: ["nginx", "node", "postgresql"],
    },
    {
      id: 2,
      name: "db-01",
      ip: "192.168.1.102",
      status: "online",
      type: "Database",
      location: "US East",
      services: ["postgresql", "redis"],
    },
    {
      id: 3,
      name: "validator-01",
      ip: "192.168.1.103",
      status: "warning",
      type: "Blockchain Validator",
      location: "EU West",
      services: ["geth", "prysm"],
    },
    {
      id: 4,
      name: "cache-01",
      ip: "192.168.1.104",
      status: "online",
      type: "Cache",
      location: "US West",
      services: ["redis", "memcached"],
    },
    {
      id: 5,
      name: "validator-02",
      ip: "192.168.1.105",
      status: "offline",
      type: "Blockchain Validator",
      location: "AP East",
      services: ["geth", "prysm"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Servers</h1>
        <Button asChild>
          <Link href="/dashboard/servers/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Server
          </Link>
        </Button>
      </div>

      <SearchBar placeholder="Search servers by name, IP, or location..." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Servers</CardTitle>
            <CardDescription>All managed servers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{servers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Online</CardTitle>
            <CardDescription>Servers with active status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">
              {servers.filter((s) => s.status === "online").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Warning</CardTitle>
            <CardDescription>Servers with warning status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-500">
              {servers.filter((s) => s.status === "warning").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Offline</CardTitle>
            <CardDescription>Servers with offline status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-500">
              {servers.filter((s) => s.status === "offline").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Servers</TabsTrigger>
          <TabsTrigger value="web">Web Servers</TabsTrigger>
          <TabsTrigger value="db">Database Servers</TabsTrigger>
          <TabsTrigger value="validator">Blockchain Validators</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Servers</CardTitle>
              <CardDescription>Manage your server infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {servers.map((server) => (
                  <div key={server.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Server className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{server.name}</h3>
                          <Badge
                            variant={
                              server.status === "online"
                                ? "default"
                                : server.status === "warning"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {server.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {server.ip} • {server.type} • {server.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/monitoring/hardware?server=${server.name}`}>Monitor</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/operations/shell?server=${server.name}`}>Shell</Link>
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
              <CardDescription>Manage your web servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {servers
                  .filter((server) => server.type === "Web Server")
                  .map((server) => (
                    <div key={server.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Server className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{server.name}</h3>
                            <Badge
                              variant={
                                server.status === "online"
                                  ? "default"
                                  : server.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {server.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {server.ip} • {server.type} • {server.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/monitoring/hardware?server=${server.name}`}>Monitor</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/operations/shell?server=${server.name}`}>Shell</Link>
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
          {/* Similar content for database servers */}
          <Card>
            <CardHeader>
              <CardTitle>Database Servers</CardTitle>
              <CardDescription>Manage your database servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {servers
                  .filter((server) => server.type === "Database")
                  .map((server) => (
                    <div key={server.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Server className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{server.name}</h3>
                            <Badge
                              variant={
                                server.status === "online"
                                  ? "default"
                                  : server.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {server.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {server.ip} • {server.type} • {server.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/monitoring/hardware?server=${server.name}`}>Monitor</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/operations/shell?server=${server.name}`}>Shell</Link>
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
        <TabsContent value="validator" className="mt-4">
          {/* Similar content for blockchain validators */}
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Validators</CardTitle>
              <CardDescription>Manage your blockchain validators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {servers
                  .filter((server) => server.type === "Blockchain Validator")
                  .map((server) => (
                    <div key={server.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Server className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{server.name}</h3>
                            <Badge
                              variant={
                                server.status === "online"
                                  ? "default"
                                  : server.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {server.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {server.ip} • {server.type} • {server.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/monitoring/hardware?server=${server.name}`}>Monitor</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/operations/shell?server=${server.name}`}>Shell</Link>
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
      </Tabs>
    </div>
  )
}
