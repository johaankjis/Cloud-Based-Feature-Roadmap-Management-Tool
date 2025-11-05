"use client"

import { OKRList } from "@/components/okr-list"
import { OKRAlignmentChart } from "@/components/okr-alignment-chart"

export default function OKRsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">OKRs & Alignment</h1>
            <p className="text-sm text-muted-foreground">Track objectives, key results, and feature alignment</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <OKRAlignmentChart />
        <OKRList />
      </div>
    </div>
  )
}
