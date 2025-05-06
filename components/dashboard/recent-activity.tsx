import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Server Restart",
      server: "web-01",
      user: "admin",
      time: "10 minutes ago",
    },
    {
      id: 2,
      action: "Service Installed",
      server: "db-01",
      service: "PostgreSQL",
      user: "system",
      time: "1 hour ago",
    },
    {
      id: 3,
      action: "Configuration Updated",
      server: "validator-01",
      file: "/etc/nginx/nginx.conf",
      user: "john.doe",
      time: "3 hours ago",
    },
    {
      id: 4,
      action: "Security Update",
      server: "All Servers",
      user: "system",
      time: "Yesterday",
    },
    {
      id: 5,
      action: "User Added",
      user: "jane.smith",
      role: "User",
      time: "2 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your servers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.server && `Server: ${activity.server}`}
                  {activity.service && ` • Service: ${activity.service}`}
                  {activity.file && ` • File: ${activity.file}`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">{activity.user}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
