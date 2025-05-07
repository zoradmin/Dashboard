"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Download, FileText, PieChart, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function AuditReportsPage() {
  const [selectedServer, setSelectedServer] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const auditReports = [
    {
      id: 1,
      name: "Monthly Security Audit",
      date: "May 1, 2025",
      type: "security",
      servers: ["all"],
      status: "completed",
      findings: 3,
    },
    {
      id: 2,
      name: "User Activity Report",
      date: "May 3, 2025",
      type: "activity",
      servers: ["web-01", "db-01"],
      status: "completed",
      findings: 0,
    },
    {
      id: 3,
      name: "File Integrity Check",
      date: "May 4, 2025",
      type: "integrity",
      servers: ["web-01"],
      status: "completed",
      findings: 2,
    },
    {
      id: 4,
      name: "Database Access Audit",
      date: "May 5, 2025",
      type: "access",
      servers: ["db-01"],
      status: "completed",
      findings: 1,
    },
    {
      id: 5,
      name: "Weekly Compliance Check",
      date: "May 6, 2025",
      type: "compliance",
      servers: ["all"],
      status: "in_progress",
      findings: 0,
    },
  ]

  const filteredReports =
    selectedServer === "all"
      ? auditReports
      : auditReports.filter((report) => report.servers.includes(selectedServer) || report.servers.includes("all"))

  const searchedReports = searchQuery
    ? filteredReports.filter(
        (report) =>
          report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredReports

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
        <h1 className="text-3xl font-bold tracking-tight">Audit Reports</h1>
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
            <CardTitle>Total Reports</CardTitle>
            <CardDescription>Audit reports generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReports.length}</div>
            <p className="text-xs text-muted-foreground">In selected time period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Security Findings</CardTitle>
            <CardDescription>Issues identified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {filteredReports.reduce((total, report) => total + report.findings, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Overall compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98%</div>
            <p className="text-xs text-muted-foreground">Based on latest audits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Reports</CardTitle>
            <CardDescription>Reports in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReports.filter((report) => report.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>
                {selectedServer === "all" ? "Reports across all servers" : `Reports for ${selectedServer}`}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DatePickerWithRange className="w-full sm:w-auto" />
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="activity">Activity</SelectItem>
                  <SelectItem value="integrity">Integrity</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Report Name</div>
                    <div>Date</div>
                    <div>Type</div>
                    <div>Servers</div>
                    <div>Findings</div>
                    <div>Actions</div>
                  </div>
                  <div className="max-h-[500px] overflow-auto">
                    {searchedReports.map((report) => (
                      <div key={report.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                        <div className="font-medium">{report.name}</div>
                        <div>{report.date}</div>
                        <div>
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-1">
                            {report.servers.map((server) => (
                              <Badge key={server} variant="outline">
                                {server === "all" ? "All Servers" : server}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          {report.status === "in_progress" ? (
                            <Badge variant="outline">In Progress</Badge>
                          ) : report.findings > 0 ? (
                            <Badge variant="destructive">{report.findings} Issues</Badge>
                          ) : (
                            <Badge variant="default">No Issues</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="charts" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <PieChart className="h-4 w-4 mr-2" />
                        Report Types Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          Pie chart visualization would appear here
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <BarChart className="h-4 w-4 mr-2" />
                        Findings by Server
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          Bar chart visualization would appear here
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
