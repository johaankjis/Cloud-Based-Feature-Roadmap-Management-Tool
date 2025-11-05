"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ListTodo, Target, Calendar } from "lucide-react"

const navItems = [
  { href: "/", label: "Features", icon: ListTodo },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/okrs", label: "OKRs", icon: Target },
  { href: "/sprints", label: "Sprints", icon: Calendar },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="py-4 font-bold text-lg text-foreground">
            Roadmap Manager
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
