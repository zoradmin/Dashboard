import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { ChatPanel } from "@/components/ai-chatbot/chat-panel"
import { NotificationSimulator } from "@/components/notifications/notification-simulator"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <SearchBar placeholder="Search servers, services, or commands..." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Servers</CardTitle>
            <CardDescription>Active and managed servers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">98%</div>
            <p className="text-xs text-muted-foreground">2 servers need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Running services across all servers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">3 services restarted today</p>
          </CardContent>
        </Card>
      </div>

      <Card className="h-[500px]">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Ask questions about your servers and get instant help</CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <ChatPanel />
        </CardContent>
      </Card>

      <NotificationSimulator />
    </div>
  )
}
