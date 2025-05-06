import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SystemStatusProps {
  className?: string
}

export function SystemStatus({ className }: SystemStatusProps) {
  const metrics = [
    {
      name: "CPU Usage",
      value: 42,
      max: 100,
      unit: "%",
    },
    {
      name: "Memory Usage",
      value: 6.2,
      max: 16,
      unit: "GB",
    },
    {
      name: "Disk Usage",
      value: 384,
      max: 512,
      unit: "GB",
    },
    {
      name: "Network In",
      value: 42,
      max: 100,
      unit: "Mbps",
    },
    {
      name: "Network Out",
      value: 18,
      max: 100,
      unit: "Mbps",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{metric.name}</div>
                <div className="text-sm text-muted-foreground">
                  {metric.value} / {metric.max} {metric.unit}
                </div>
              </div>
              <Progress value={(metric.value / metric.max) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
