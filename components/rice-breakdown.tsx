"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RiceBreakdown() {
  const { features } = useRoadmapStore()

  const activeFeatures = features.filter((f) => f.status !== "archived" && f.status !== "completed")

  const avgReach = activeFeatures.reduce((sum, f) => sum + f.reach, 0) / activeFeatures.length || 0
  const avgImpact = activeFeatures.reduce((sum, f) => sum + f.impact, 0) / activeFeatures.length || 0
  const avgConfidence = activeFeatures.reduce((sum, f) => sum + f.confidence, 0) / activeFeatures.length || 0
  const avgEffort = activeFeatures.reduce((sum, f) => sum + f.effort, 0) / activeFeatures.length || 0

  const metrics = [
    {
      label: "Reach",
      value: avgReach,
      description: "How many users will this impact?",
      color: "bg-blue-500",
    },
    {
      label: "Impact",
      value: avgImpact,
      description: "How much will it impact each user?",
      color: "bg-purple-500",
    },
    {
      label: "Confidence",
      value: avgConfidence,
      description: "How confident are we in our estimates?",
      color: "bg-green-500",
    },
    {
      label: "Effort",
      value: avgEffort,
      description: "How much work will this require?",
      color: "bg-orange-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>RICE Score Breakdown</CardTitle>
        <CardDescription>Average scores across active features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </div>
              <div className="text-2xl font-bold text-foreground">{metric.value.toFixed(1)}</div>
            </div>
            <Progress value={metric.value * 10} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
