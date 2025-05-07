"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Server, Settings, User, BarChart3, Wrench, HardDrive, Shield, FileAudio, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { useTheme } from "@/components/theme-context"

// Define the main navigation sections
type Section = "servers" | "validators" | "operations" | "monitoring" | "security" | "audit" | null

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<Section>(null)

  // Determine the active section based on the current pathname
  useEffect(() => {
    if (pathname.includes("/servers")) {
      setActiveSection("servers")
    } else if (pathname.includes("/validators")) {
      setActiveSection("validators")
    } else if (pathname.includes("/operations")) {
      setActiveSection("operations")
    } else if (pathname.includes("/monitoring")) {
      setActiveSection("monitoring")
    } else if (pathname.includes("/security")) {
      setActiveSection("security")
    } else if (pathname.includes("/audit")) {
      setActiveSection("audit")
    } else {
      setActiveSection(null)
    }
  }, [pathname])

  // Toggle a section's active state
  const toggleSection = (section: Section) => {
    setActiveSection((prev) => (prev === section ? null : section))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNavigation activeSection={activeSection} toggleSection={toggleSection} />
      <div className="flex flex-1">
        {activeSection && <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function TopNavigation({
  activeSection,
  toggleSection,
}: {
  activeSection: Section
  toggleSection: (section: Section) => void
}) {
  const { setTheme } = useTheme()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-2 border-b bg-background px-2 md:px-4">
      <div className="flex items-center gap-1">
        <Link href="/dashboard" className="flex items-center gap-1 font-semibold">
          <Server className="h-4 w-4" />
          <span>VH</span>
        </Link>
      </div>

      {/* Main Navigation in Top Bar */}
      <nav className="flex items-center gap-1 ml-4 text-sm font-medium">
        <Button
          variant={activeSection === "servers" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("servers")
            router.push("/dashboard/servers")
          }}
        >
          <Server className="h-3.5 w-3.5 mr-1" />
          Servers
        </Button>

        <Button
          variant={activeSection === "validators" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("validators")
            router.push("/dashboard/validators")
          }}
        >
          <BarChart3 className="h-3.5 w-3.5 mr-1" />
          Validators
        </Button>

        <Button
          variant={activeSection === "operations" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("operations")
            router.push("/dashboard/operations/manual")
          }}
        >
          <Wrench className="h-3.5 w-3.5 mr-1" />
          Operations
        </Button>

        <Button
          variant={activeSection === "monitoring" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("monitoring")
            router.push("/dashboard/monitoring/hardware")
          }}
        >
          <HardDrive className="h-3.5 w-3.5 mr-1" />
          Monitoring
        </Button>

        <Button
          variant={activeSection === "security" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("security")
            router.push("/dashboard/security/firewall")
          }}
        >
          <Shield className="h-3.5 w-3.5 mr-1" />
          Security
        </Button>

        <Button
          variant={activeSection === "audit" ? "default" : "ghost"}
          size="sm"
          className="h-7"
          onClick={() => {
            toggleSection("audit")
            router.push("/dashboard/audit/logs")
          }}
        >
          <FileAudio className="h-3.5 w-3.5 mr-1" />
          Audit
        </Button>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <User className="h-4 w-4" />
              <span className="sr-only">User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function Sidebar({
  activeSection,
  setActiveSection,
}: { activeSection: Section; setActiveSection: (section: Section) => void }) {
  const pathname = usePathname()

  // Render different sidebar content based on active section
  const renderSidebarContent = () => {
    switch (activeSection) {
      case "servers":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <div className="font-semibold">Servers</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/servers"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/servers" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Server className="h-4 w-4" />
                  <span>All Servers</span>
                </Link>
                <Link
                  href="/dashboard/servers?type=web"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname.includes("/dashboard/servers") && pathname.includes("?type=web")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Web Servers</span>
                </Link>
                <Link
                  href="/dashboard/servers?type=db"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname.includes("/dashboard/servers") && pathname.includes("?type=db")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Database Servers</span>
                </Link>
                <Link
                  href="/dashboard/servers?type=cache"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname.includes("/dashboard/servers") && pathname.includes("?type=cache")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Cache Servers</span>
                </Link>
                <Link
                  href="/dashboard/servers/shell"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/servers/shell" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Shell</span>
                </Link>
                <Link
                  href="/dashboard/servers/code-editor"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/servers/code-editor"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Code Editor</span>
                </Link>
                <Link
                  href="/dashboard/servers/hardware"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/servers/hardware" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Hardware</span>
                </Link>
                <Link
                  href="/dashboard/servers/ai-playground"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/servers/ai-playground"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>AI Playground</span>
                </Link>
              </nav>
            </div>
          </>
        )

      case "validators":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <div className="font-semibold">Validators</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/validators"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/validators" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>All Validators</span>
                </Link>
                <Link
                  href="/dashboard/validators/eth"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/validators/eth" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>ETH Validators</span>
                </Link>
                <Link
                  href="/dashboard/validators/sol"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/validators/sol" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>SOL Validators</span>
                </Link>
              </nav>
            </div>
          </>
        )

      case "operations":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                <div className="font-semibold">Operations</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/operations/manual"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/operations/manual"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Manual</span>
                </Link>
                <Link
                  href="/dashboard/operations/shell"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/operations/shell" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Linux Shell</span>
                </Link>
                <Link
                  href="/dashboard/operations/code-editor"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/operations/code-editor"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Code Editor</span>
                </Link>
                <Link
                  href="/dashboard/operations/ai-playground"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/operations/ai-playground"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>AI Playground</span>
                </Link>
              </nav>
            </div>
          </>
        )

      case "monitoring":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                <div className="font-semibold">Monitoring</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/monitoring/hardware"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/monitoring/hardware"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Hardware</span>
                </Link>
                <Link
                  href="/dashboard/monitoring/services"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/monitoring/services"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Services</span>
                </Link>
                <Link
                  href="/dashboard/monitoring/network"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/monitoring/network"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Network</span>
                </Link>
                <Link
                  href="/dashboard/monitoring/logs"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/monitoring/logs" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Logs</span>
                </Link>
              </nav>
            </div>
          </>
        )

      case "security":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <div className="font-semibold">Security</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/security/firewall"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/security/firewall"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Firewall</span>
                </Link>
                <Link
                  href="/dashboard/security/updates"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/security/updates" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Updates</span>
                </Link>
              </nav>
            </div>
          </>
        )

      case "audit":
        return (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <FileAudio className="h-5 w-5" />
                <div className="font-semibold">Audit</div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard/audit/logs"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/audit/logs" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Logs</span>
                </Link>
                <Link
                  href="/dashboard/audit/reports"
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    pathname === "/dashboard/audit/reports" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>Reports</span>
                </Link>
              </nav>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-64 border-r bg-background">
      {renderSidebarContent()}
      <div className="mt-auto p-3 border-t">
        <div className="text-xs text-muted-foreground">VH Dashboard v1.0</div>
      </div>
    </div>
  )
}
