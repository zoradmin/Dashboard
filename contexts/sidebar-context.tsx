"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Section = "servers" | "validators" | "operations" | "monitoring" | "security" | "audit" | null

interface SidebarContextType {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<Section>(null)

  return <SidebarContext.Provider value={{ activeSection, setActiveSection }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
