'use client'

import { useState } from "react"
import { LayoutDashboard, Activity, Users, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Insight Dashboard", url: "/insights", icon: Activity },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()
  const currentPath = pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-medical-border">
        <div className="p-4 border-b border-medical-border">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-medical-blue">ClinicalPad</h2>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-medical-blue rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
          )}
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-medical-gray text-xs uppercase tracking-wider mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive(item.url)
                          ? "bg-medical-blue text-white" 
                          : "text-medical-gray hover:bg-medical-light-gray hover:text-medical-blue"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}