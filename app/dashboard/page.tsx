"use client"

import { StatsCards } from "@/components/stats-cards"
import { RiceChart } from "@/components/rice-chart"
import { RiceBreakdown } from "@/components/rice-breakdown"
import { PriorityMatrix } from "@/components/priority-matrix"
import { StatusDistribution } from "@/components/status-distribution"
import { VelocityChart } from "@/components/velocity-chart"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your product roadmap and key metrics</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <RiceChart />
          <StatusDistribution />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RiceBreakdown />
          <PriorityMatrix />
        </div>

        <VelocityChart />
      </div>
    </div>
  )
}
