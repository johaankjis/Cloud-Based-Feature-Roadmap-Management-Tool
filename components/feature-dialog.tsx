"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRoadmapStore } from "@/lib/store"
import type { Feature, FeatureStatus, FeaturePriority } from "@/lib/types"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FeatureDialogProps {
  feature?: Feature | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeatureDialog({ feature, open, onOpenChange }: FeatureDialogProps) {
  const { addFeature, updateFeature, okrs, sprints } = useRoadmapStore()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "backlog" as FeatureStatus,
    priority: "medium" as FeaturePriority,
    reach: 5,
    impact: 5,
    confidence: 5,
    effort: 5,
    okrIds: [] as string[],
    sprintId: null as string | null,
    tags: "",
  })

  useEffect(() => {
    if (feature) {
      setFormData({
        title: feature.title,
        description: feature.description,
        status: feature.status,
        priority: feature.priority,
        reach: feature.reach,
        impact: feature.impact,
        confidence: feature.confidence,
        effort: feature.effort,
        okrIds: feature.okrIds,
        sprintId: feature.sprintId,
        tags: feature.tags.join(", "),
      })
    } else {
      setFormData({
        title: "",
        description: "",
        status: "backlog",
        priority: "medium",
        reach: 5,
        impact: 5,
        confidence: 5,
        effort: 5,
        okrIds: [],
        sprintId: null,
        tags: "",
      })
    }
  }, [feature, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    if (feature) {
      updateFeature(feature.id, { ...formData, tags })
    } else {
      addFeature({ ...formData, tags })
    }

    onOpenChange(false)
  }

  const riceScore =
    formData.effort > 0 ? ((formData.reach * formData.impact * formData.confidence) / formData.effort).toFixed(1) : "0"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{feature ? "Edit Feature" : "Create New Feature"}</DialogTitle>
          <DialogDescription>
            {feature ? "Update the feature details below." : "Add a new feature to your roadmap."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: FeatureStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: FeaturePriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>RICE Score Components</Label>
              <div className="text-sm">
                <span className="text-muted-foreground">Score: </span>
                <span className="font-semibold text-primary text-lg">{riceScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reach">Reach (1-10)</Label>
                <Input
                  id="reach"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.reach}
                  onChange={(e) => setFormData({ ...formData, reach: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Impact (1-10)</Label>
                <Input
                  id="impact"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">Confidence (1-10)</Label>
                <Input
                  id="confidence"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.confidence}
                  onChange={(e) => setFormData({ ...formData, confidence: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effort">Effort (1-10)</Label>
                <Input
                  id="effort"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.effort}
                  onChange={(e) => setFormData({ ...formData, effort: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sprint">Sprint</Label>
            <Select
              value={formData.sprintId || "none"}
              onValueChange={(value) => setFormData({ ...formData, sprintId: value === "none" ? null : value })}
            >
              <SelectTrigger id="sprint">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sprint</SelectItem>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., ux, mobile, api"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{feature ? "Update" : "Create"} Feature</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
