"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SprintBoard } from "@/components/sprint-board"
import { SprintDialog } from "@/components/sprint-dialog"

export default function SprintsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sprint Planning</h1>
              <p className="text-sm text-muted-foreground">Manage sprints and plan feature delivery</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Sprint
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <SprintBoard />
      </div>

      <SprintDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
