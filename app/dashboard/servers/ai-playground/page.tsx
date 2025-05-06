import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIPlaygroundPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Playground</h1>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="commands">Common Commands</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-4">
          <Card className="h-[calc(100vh-240px)] flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Ask me anything about your servers or let me help you with tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-md p-3 w-8 h-8 flex items-center justify-center">
                    AI
                  </div>
                  <div className="bg-muted rounded-md p-3 flex-1">
                    <p>Hello! I'm your AI assistant. How can I help you manage your servers today?</p>
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="bg-primary text-primary-foreground rounded-md p-3 w-8 h-8 flex items-center justify-center">
                    You
                  </div>
                  <div className="bg-secondary rounded-md p-3 flex-1">
                    <p>I need to harden the security on my web server.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-md p-3 w-8 h-8 flex items-center justify-center">
                    AI
                  </div>
                  <div className="bg-muted rounded-md p-3 flex-1">
                    <p>I can help you harden your web server. Here are some recommended steps:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>
                        Update all packages: <code>apt update && apt upgrade -y</code>
                      </li>
                      <li>Configure firewall to only allow necessary ports</li>
                      <li>Disable root SSH login</li>
                      <li>Set up fail2ban to prevent brute force attacks</li>
                      <li>Implement strong password policies</li>
                    </ol>
                    <p className="mt-2">Would you like me to implement any of these measures for you?</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="commands" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Commands</CardTitle>
              <CardDescription>Quick access to frequently used operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Harden system security",
                  "Install NGINX",
                  "Update all packages",
                  "Configure firewall",
                  "Set up SSL certificate",
                  "Create new user",
                  "Change SSH port",
                  "Install Docker",
                  "Configure database backup",
                ].map((command) => (
                  <Button key={command} variant="outline" className="h-auto py-4 justify-start">
                    {command}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
