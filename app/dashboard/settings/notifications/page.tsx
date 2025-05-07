"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, Save, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function NotificationSettingsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [slackEnabled, setSlackEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="channels" className="w-full">
        <TabsList>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="alerts">Alert Rules</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="channels" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                </div>

                {emailEnabled && (
                  <div className="ml-6 space-y-4 rounded-md border p-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input id="email-address" defaultValue="admin@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Frequency</Label>
                      <Select defaultValue="realtime">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                </div>

                {pushEnabled && (
                  <div className="ml-6 space-y-4 rounded-md border p-4">
                    <div className="space-y-2">
                      <Label>Registered Devices</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-md border p-2">
                          <div className="text-sm">Chrome - MacBook Pro</div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-2">
                          <div className="text-sm">Firefox - Windows PC</div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Slack Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in Slack</p>
                  </div>
                  <Switch checked={slackEnabled} onCheckedChange={setSlackEnabled} />
                </div>

                {slackEnabled && (
                  <div className="ml-6 space-y-4 rounded-md border p-4">
                    <div className="space-y-2">
                      <Label>Slack Workspace</Label>
                      <Select defaultValue="sysadmin">
                        <SelectTrigger>
                          <SelectValue placeholder="Select workspace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sysadmin">SysAdmin Team</SelectItem>
                          <SelectItem value="devops">DevOps Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Slack Channel</Label>
                      <Select defaultValue="alerts">
                        <SelectTrigger>
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alerts">#server-alerts</SelectItem>
                          <SelectItem value="general">#general</SelectItem>
                          <SelectItem value="monitoring">#monitoring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Smartphone className="mr-2 h-4 w-4" />
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                </div>

                {smsEnabled && (
                  <div className="ml-6 space-y-4 rounded-md border p-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label>SMS Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sms-critical" defaultChecked />
                          <label
                            htmlFor="sms-critical"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Critical alerts only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Configure which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Performance Alerts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">CPU Usage</div>
                        <div className="text-sm text-muted-foreground">Alert when CPU usage exceeds threshold</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select defaultValue="90">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="80">80%</SelectItem>
                            <SelectItem value="90">90%</SelectItem>
                            <SelectItem value="95">95%</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Memory Usage</div>
                        <div className="text-sm text-muted-foreground">Alert when memory usage exceeds threshold</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select defaultValue="85">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="80">80%</SelectItem>
                            <SelectItem value="85">85%</SelectItem>
                            <SelectItem value="90">90%</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Disk Space</div>
                        <div className="text-sm text-muted-foreground">Alert when disk space is below threshold</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select defaultValue="10">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Security Alerts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Failed Login Attempts</div>
                        <div className="text-sm text-muted-foreground">Alert on multiple failed login attempts</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select defaultValue="3">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                            <SelectItem value="10">10 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Security Updates</div>
                        <div className="text-sm text-muted-foreground">Alert when security updates are available</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical only</SelectItem>
                            <SelectItem value="high">High & Critical</SelectItem>
                            <SelectItem value="all">All updates</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Service Alerts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Service Status</div>
                        <div className="text-sm text-muted-foreground">Alert when services stop or restart</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Database Connectivity</div>
                        <div className="text-sm text-muted-foreground">Alert on database connection issues</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
              <CardDescription>Configure when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Silence non-critical notifications during specific hours
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select defaultValue="22">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Days of Week</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="flex flex-col items-center">
                        <Checkbox id={`day-${day}`} defaultChecked={day !== "Sat" && day !== "Sun"} />
                        <label
                          htmlFor={`day-${day}`}
                          className="mt-1 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Override for Critical Alerts</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="critical-override" defaultChecked />
                    <label
                      htmlFor="critical-override"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Always send critical alerts regardless of quiet hours
                    </label>
                  </div>
                </div>

                <div className="rounded-md border p-4 bg-muted/50">
                  <h3 className="font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Summary
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You will receive all critical alerts at any time. Non-critical alerts will be delivered between
                    07:00 and 22:00 on weekdays.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
