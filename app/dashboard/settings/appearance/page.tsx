"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Moon, Palette, Save, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-context"

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()
  const [primaryColor, setPrimaryColor] = useState("blue")
  const [sidebarMode, setSidebarMode] = useState("floating")
  const [sidebarCollapsible, setSidebarCollapsible] = useState("icon")

  const colors = [
    { name: "Slate", value: "slate", bg: "bg-slate-600", text: "text-slate-600" },
    { name: "Blue", value: "blue", bg: "bg-blue-600", text: "text-blue-600" },
    { name: "Green", value: "green", bg: "bg-green-600", text: "text-green-600" },
    { name: "Violet", value: "violet", bg: "bg-violet-600", text: "text-violet-600" },
    { name: "Rose", value: "rose", bg: "bg-rose-600", text: "text-rose-600" },
    { name: "Orange", value: "orange", bg: "bg-orange-600", text: "text-orange-600" },
  ]

  const saveSettings = () => {
    // In a real app, this would save the settings to a database or local storage
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
        <Button onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Theme</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:border-primary ${theme === "light" ? "border-primary" : "border-muted"}`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="mb-3 rounded-full bg-primary/10 p-2">
                      <Sun className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-medium">Light</div>
                    <div className="text-sm text-muted-foreground">Light background with dark text</div>
                    {theme === "light" && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:border-primary ${theme === "dark" ? "border-primary" : "border-muted"}`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="mb-3 rounded-full bg-primary/10 p-2">
                      <Moon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-medium">Dark</div>
                    <div className="text-sm text-muted-foreground">Dark background with light text</div>
                    {theme === "dark" && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:border-primary ${theme === "system" ? "border-primary" : "border-muted"}`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="mb-3 rounded-full bg-primary/10 p-2">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-medium">System</div>
                    <div className="text-sm text-muted-foreground">Follows your system preferences</div>
                    {theme === "system" && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
              <CardDescription>Customize the color scheme of the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <RadioGroup
                  value={primaryColor}
                  onValueChange={setPrimaryColor}
                  className="grid grid-cols-3 md:grid-cols-6 gap-4"
                >
                  {colors.map((color) => (
                    <div key={color.value} className="relative">
                      <RadioGroupItem value={color.value} id={`color-${color.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:border-primary peer-data-[state=checked]:border-primary"
                      >
                        <div className={`h-6 w-6 rounded-full ${color.bg}`} />
                        <span className="mt-2 text-sm font-medium">{color.name}</span>
                      </Label>
                      {primaryColor === color.value && (
                        <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {colors.map((color) => (
                    <div
                      key={color.value}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer"
                    >
                      <div className={`h-6 w-6 rounded-full ${color.bg}`} />
                      <span className="mt-2 text-sm font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>Customize the layout of the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Sidebar Mode</Label>
                <RadioGroup
                  value={sidebarMode}
                  onValueChange={setSidebarMode}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    { name: "Standard", value: "sidebar", description: "Standard sidebar with border" },
                    { name: "Floating", value: "floating", description: "Floating sidebar with shadow" },
                    { name: "Inset", value: "inset", description: "Inset sidebar with background" },
                  ].map((mode) => (
                    <div key={mode.value} className="relative">
                      <RadioGroupItem value={mode.value} id={`sidebar-${mode.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`sidebar-${mode.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:border-primary peer-data-[state=checked]:border-primary"
                      >
                        <span className="text-sm font-medium">{mode.name}</span>
                        <span className="text-xs text-muted-foreground">{mode.description}</span>
                      </Label>
                      {sidebarMode === mode.value && <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />}
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Sidebar Collapsible Mode</Label>
                <RadioGroup
                  value={sidebarCollapsible}
                  onValueChange={setSidebarCollapsible}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    { name: "Offcanvas", value: "offcanvas", description: "Sidebar slides off screen" },
                    { name: "Icon Only", value: "icon", description: "Sidebar collapses to icons" },
                    { name: "None", value: "none", description: "Sidebar cannot be collapsed" },
                  ].map((mode) => (
                    <div key={mode.value} className="relative">
                      <RadioGroupItem value={mode.value} id={`collapsible-${mode.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`collapsible-${mode.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:border-primary peer-data-[state=checked]:border-primary"
                      >
                        <span className="text-sm font-medium">{mode.name}</span>
                        <span className="text-xs text-muted-foreground">{mode.description}</span>
                      </Label>
                      {sidebarCollapsible === mode.value && (
                        <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
