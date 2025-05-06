import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ServerOverviewProps {
  className?: string
}

export function ServerOverview({ className }: ServerOverviewProps) {
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
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Server Overview</CardTitle>
        <CardDescription>Status of your managed servers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {servers.map((server) => (
            <div key={server.id} className="flex flex-col space-y-2 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="font-medium">{server.name}</div>
                  <Badge
                    variant={
                      server.status === "online" ? "default" : server.status === "warning" ? "warning" : "destructive"
                    }
                  >
                    {server.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{server.ip}</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {server.type} • {server.location}
              </div>
              <div className="flex flex-wrap gap-1">
                {server.services.map((service) => (
                  <Badge key={service} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
