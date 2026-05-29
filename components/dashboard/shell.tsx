"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarWidth, setSidebarWidth] = useState(256)

  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector("aside")
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth)
      }
    }

    checkSidebar()
    const observer = new MutationObserver(checkSidebar)
    const sidebar = document.querySelector("aside")
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
