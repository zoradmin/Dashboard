import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CloudUpload, Key, Server, Shield } from "lucide-react"

export default function ManualOperationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manual & Operations</h1>
      </div>

      <Tabs defaultValue="add-server" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="add-server">Add Server</TabsTrigger>
          <TabsTrigger value="connect-vps">Connect VPS</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="add-server" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Server</CardTitle>
              <CardDescription>Connect to a new server manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="server-name">Server Name</Label>
                  <Input id="server-name" placeholder="e.g., web-03" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="server-ip">IP Address</Label>
                  <Input id="server-ip" placeholder="e.g., 192.168.1.105" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="server-type">Server Type</Label>
                <Select>
                  <SelectTrigger id="server-type">
                    <SelectValue placeholder="Select server type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Server</SelectItem>
                    <SelectItem value="db">Database Server</SelectItem>
                    <SelectItem value="validator">Blockchain Validator</SelectItem>
                    <SelectItem value="cache">Cache Server</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssh-key">SSH Key</Label>
                <Textarea id="ssh-key" placeholder="Paste your SSH public key here" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="server-location">Location</Label>
                <Select>
                  <SelectTrigger id="server-location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east">US East</SelectItem>
                    <SelectItem value="us-west">US West</SelectItem>
                    <SelectItem value="eu-west">EU West</SelectItem>
                    <SelectItem value="ap-east">AP East</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Server className="mr-2 h-4 w-4" />
                Add Server
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connect-vps" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect VPS Provider</CardTitle>
              <CardDescription>Connect to cloud VPS providers using API tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vps-provider">VPS Provider</Label>
                <Select>
                  <SelectTrigger id="vps-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                    <SelectItem value="digitalocean">DigitalOcean</SelectItem>
                    <SelectItem value="linode">Linode</SelectItem>
                    <SelectItem value="vultr">Vultr</SelectItem>
                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-token">API Token</Label>
                <Input id="api-token" type="password" placeholder="Enter your API token" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-name">Token Name (Optional)</Label>
                <Input id="token-name" placeholder="e.g., Production AWS" />
              </div>

              <Button className="w-full">
                <CloudUpload className="mr-2 h-4 w-4" />
                Connect Provider
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Management</CardTitle>
              <CardDescription>Manage keys and secure connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Automatic Key Exchange</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate and exchange secure keys between dashboard and servers
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Generate New Keys
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">SSH Key Management</h3>
                    <p className="text-sm text-muted-foreground">Manage SSH keys for server access</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="ssh-key-name">Key Name</Label>
                  <Input id="ssh-key-name" placeholder="e.g., Production Key" />
                </div>
                <div className="mt-2 space-y-2">
                  <Label htmlFor="ssh-public-key">Public Key</Label>
                  <Textarea
                    id="ssh-public-key"
                    placeholder="Paste your SSH public key here"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="mt-4">
                  <Button className="w-full">Add SSH Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
