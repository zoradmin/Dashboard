"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Code,
  Database,
  Eye,
  FileEdit,
  HardDrive,
  Home,
  Network,
  ScrollText,
  Server,
  Settings,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    operations: true,
    monitoring: true,
    code: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r-2 border-border">
      <SidebarHeader className="border-b-2 border-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <Server className="h-6 w-6" />
          <div className="font-semibold text-lg">SysAdmin</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/servers"} tooltip="Servers">
              <Link href="/dashboard/servers">
                <Server className="h-5 w-5" />
                <span>Servers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Collapsible
          open={openGroups.operations}
          onOpenChange={() => toggleGroup("operations")}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full cursor-pointer">
                <div className="flex items-center">
                  <Wrench className="mr-2 h-5 w-5" />
                  <span>Operations</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/operations/manual"}
                      tooltip="Manual & Operations"
                    >
                      <Link href="/dashboard/operations/manual">
                        <Settings className="h-5 w-5" />
                        <span>Manual & Operations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/operations/ai-playground"}
                      tooltip="AI Playground"
                    >
                      <Link href="/dashboard/operations/ai-playground">
                        <Zap className="h-5 w-5" />
                        <span>AI Playground</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/operations/shell"}
                      tooltip="Linux Shell"
                    >
                      <Link href="/dashboard/operations/shell">
                        <Terminal className="h-5 w-5" />
                        <span>Linux Shell</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/operations/code-editor"}
                      tooltip="Code Editor"
                    >
                      <Link href="/dashboard/operations/code-editor">
                        <Code className="h-5 w-5" />
                        <span>Code Editor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible
          open={openGroups.monitoring}
          onOpenChange={() => toggleGroup("monitoring")}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full cursor-pointer">
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5" />
                  <span>Monitoring</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/monitoring/hardware"}
                      tooltip="Hardware"
                    >
                      <Link href="/dashboard/monitoring/hardware">
                        <HardDrive className="h-5 w-5" />
                        <span>Hardware</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/monitoring/services"}
                      tooltip="Services"
                    >
                      <Link href="/dashboard/monitoring/services">
                        <Database className="h-5 w-5" />
                        <span>Services</span>
                        <Badge variant="outline" className="ml-auto">
                          24
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/monitoring/network"}
                      tooltip="Network"
                    >
                      <Link href="/dashboard/monitoring/network">
                        <Network className="h-5 w-5" />
                        <span>Network</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/monitoring/logs"} tooltip="Logs">
                      <Link href="/dashboard/monitoring/logs">
                        <ScrollText className="h-5 w-5" />
                        <span>Logs</span>
                        <Badge variant="destructive" className="ml-auto">
                          3
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible open={openGroups.code} onOpenChange={() => toggleGroup("code")} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full cursor-pointer">
                <div className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  <span>Code</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/code/view"} tooltip="View Code">
                      <Link href="/dashboard/code/view">
                        <Eye className="h-5 w-5" />
                        <span>View Code</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/code/edit"} tooltip="Edit Code">
                      <Link href="/dashboard/code/edit">
                        <FileEdit className="h-5 w-5" />
                        <span>Edit Code</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-border">
        <div className="px-3 py-2">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
