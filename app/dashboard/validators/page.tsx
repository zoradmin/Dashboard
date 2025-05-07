import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Activity, Settings } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchBar } from "@/components/search-bar"

export default function ValidatorsPage() {
  const validators = [
    {
      id: 1,
      name: "eth-validator-01",
      network: "Ethereum",
      status: "active",
      balance: "32.05 ETH",
      rewards: "0.00042 ETH/day",
      uptime: "99.98%",
    },
    {
      id: 2,
      name: "eth-validator-02",
      network: "Ethereum",
      status: "active",
      balance: "32.12 ETH",
      rewards: "0.00045 ETH/day",
      uptime: "99.95%",
    },
    {
      id: 3,
      name: "sol-validator-01",
      network: "Solana",
      status: "warning",
      balance: "1250.45 SOL",
      rewards: "0.42 SOL/day",
      uptime: "98.75%",
    },
    {
      id: 4,
      name: "sol-validator-02",
      network: "Solana",
      status: "offline",
      balance: "1200.32 SOL",
      rewards: "0.00 SOL/day",
      uptime: "0%",
    },
    {
      id: 5,
      name: "eth-validator-03",
      network: "Ethereum",
      status: "active",
      balance: "32.08 ETH",
      rewards: "0.00044 ETH/day",
      uptime: "99.97%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Validators</h1>
        <Button asChild>
          <Link href="/dashboard/validators/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Validator
          </Link>
        </Button>
      </div>

      <SearchBar placeholder="Search validators by name or network..." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Validators</CardTitle>
            <CardDescription>All managed validators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{validators.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active</CardTitle>
            <CardDescription>Validators with active status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">
              {validators.filter((v) => v.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Warning</CardTitle>
            <CardDescription>Validators with warning status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-500">
              {validators.filter((v) => v.status === "warning").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Offline</CardTitle>
            <CardDescription>Validators with offline status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-500">
              {validators.filter((v) => v.status === "offline").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Validators</TabsTrigger>
          <TabsTrigger value="eth">Ethereum</TabsTrigger>
          <TabsTrigger value="sol">Solana</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Validators</CardTitle>
              <CardDescription>Manage your validator infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {validators.map((validator) => (
                  <div key={validator.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Activity className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{validator.name}</h3>
                          <Badge
                            variant={
                              validator.status === "active"
                                ? "default"
                                : validator.status === "warning"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {validator.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {validator.network} • {validator.balance} • {validator.uptime} uptime
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/validators/stats?validator=${validator.name}`}>Stats</Link>
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
        <TabsContent value="eth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ethereum Validators</CardTitle>
              <CardDescription>Manage your Ethereum validators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {validators
                  .filter((validator) => validator.network === "Ethereum")
                  .map((validator) => (
                    <div key={validator.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Activity className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{validator.name}</h3>
                            <Badge
                              variant={
                                validator.status === "active"
                                  ? "default"
                                  : validator.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {validator.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {validator.network} • {validator.balance} • {validator.uptime} uptime
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/validators/stats?validator=${validator.name}`}>Stats</Link>
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
        <TabsContent value="sol" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Solana Validators</CardTitle>
              <CardDescription>Manage your Solana validators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {validators
                  .filter((validator) => validator.network === "Solana")
                  .map((validator) => (
                    <div key={validator.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Activity className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{validator.name}</h3>
                            <Badge
                              variant={
                                validator.status === "active"
                                  ? "default"
                                  : validator.status === "warning"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {validator.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {validator.network} • {validator.balance} • {validator.uptime} uptime
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/validators/stats?validator=${validator.name}`}>Stats</Link>
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
