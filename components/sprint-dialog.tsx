"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRoadmapStore } from "@/lib/store"
import type { Sprint } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SprintDialogProps {
  sprint?: Sprint | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SprintDialog({ sprint, open, onOpenChange }: SprintDialogProps) {
  const { addSprint, updateSprint } = useRoadmapStore()

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "planning" as Sprint["status"],
    capacity: 80,
    velocity: 0,
  })

  useEffect(() => {
    if (sprint) {
      setFormData({
        name: sprint.name,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        status: sprint.status,
        capacity: sprint.capacity,
        velocity: sprint.velocity,
      })
    } else {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        status: "planning",
        capacity: 80,
        velocity: 0,
      })
    }
  }, [sprint, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (sprint) {
      updateSprint(sprint.id, formData)
    } else {
      addSprint(formData)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sprint ? "Edit Sprint" : "Create New Sprint"}</DialogTitle>
          <DialogDescription>
            {sprint ? "Update the sprint details below." : "Add a new sprint to your roadmap."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Sprint Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Sprint 27 - Feature Focus"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Sprint["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          {sprint && (
            <div className="space-y-2">
              <Label htmlFor="velocity">Velocity (Completed)</Label>
              <Input
                id="velocity"
                type="number"
                min="0"
                value={formData.velocity}
                onChange={(e) => setFormData({ ...formData, velocity: Number(e.target.value) })}
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{sprint ? "Update" : "Create"} Sprint</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
