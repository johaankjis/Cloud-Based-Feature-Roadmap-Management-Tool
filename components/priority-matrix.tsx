"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PriorityMatrix() {
  const { features } = useRoadmapStore()

  const activeFeatures = features.filter((f) => f.status !== "archived" && f.status !== "completed")

  // Categorize features into quadrants based on impact and effort
  const quickWins = activeFeatures.filter((f) => f.impact >= 7 && f.effort <= 4)
  const majorProjects = activeFeatures.filter((f) => f.impact >= 7 && f.effort > 4)
  const fillIns = activeFeatures.filter((f) => f.impact < 7 && f.effort <= 4)
  const timeWasters = activeFeatures.filter((f) => f.impact < 7 && f.effort > 4)

  const quadrants = [
    {
      title: "Quick Wins",
      description: "High impact, low effort",
      features: quickWins,
      color: "bg-emerald-500/10 border-emerald-500/20",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Major Projects",
      description: "High impact, high effort",
      features: majorProjects,
      color: "bg-blue-500/10 border-blue-500/20",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: "Fill-Ins",
      description: "Low impact, low effort",
      features: fillIns,
      color: "bg-amber-500/10 border-amber-500/20",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      title: "Time Wasters",
      description: "Low impact, high effort",
      features: timeWasters,
      color: "bg-red-500/10 border-red-500/20",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Matrix</CardTitle>
        <CardDescription>Features categorized by impact vs effort</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quadrants.map((quadrant) => (
            <div key={quadrant.title} className={`rounded-lg border p-4 ${quadrant.color}`}>
              <div className="mb-3">
                <h3 className="font-semibold text-foreground">{quadrant.title}</h3>
                <p className="text-xs text-muted-foreground">{quadrant.description}</p>
              </div>
              <div className="space-y-2">
                {quadrant.features.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No features</p>
                ) : (
                  quadrant.features.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground truncate">{feature.title}</span>
                      <Badge variant="outline" className={`text-xs ${quadrant.badgeColor} shrink-0`}>
                        {feature.riceScore.toFixed(0)}
                      </Badge>
                    </div>
                  ))
                )}
                {quadrant.features.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{quadrant.features.length - 3} more</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
