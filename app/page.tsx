"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FeatureTable } from "@/components/feature-table"
import { FeatureDialog } from "@/components/feature-dialog"
import { StatsCards } from "@/components/stats-cards"

export default function Home() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Feature Roadmap</h1>
              <p className="text-sm text-muted-foreground">Manage and prioritize your product features</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Feature
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <StatsCards />
        </div>

        <FeatureTable />
      </div>

      <FeatureDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
