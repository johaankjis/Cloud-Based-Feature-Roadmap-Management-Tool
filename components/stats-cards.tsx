"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Zap, CheckCircle2 } from "lucide-react"

export function StatsCards() {
  const { features, okrs, sprints } = useRoadmapStore()

  const activeFeatures = features.filter((f) => f.status === "in-progress" || f.status === "planned")
  const completedFeatures = features.filter((f) => f.status === "completed")
  const avgRiceScore = activeFeatures.reduce((sum, f) => sum + f.riceScore, 0) / activeFeatures.length || 0
  const avgOKRProgress = okrs.reduce((sum, o) => sum + o.progress, 0) / okrs.length || 0

  const stats = [
    {
      title: "Active Features",
      value: activeFeatures.length,
      description: `${completedFeatures.length} completed`,
      icon: Zap,
      color: "text-blue-400",
    },
    {
      title: "Avg RICE Score",
      value: avgRiceScore.toFixed(1),
      description: "Across active features",
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      title: "OKR Progress",
      value: `${avgOKRProgress.toFixed(0)}%`,
      description: `${okrs.length} total objectives`,
      icon: Target,
      color: "text-emerald-400",
    },
    {
      title: "Completion Rate",
      value: `${features.length > 0 ? ((completedFeatures.length / features.length) * 100).toFixed(0) : 0}%`,
      description: `${completedFeatures.length}/${features.length} features`,
      icon: CheckCircle2,
      color: "text-amber-400",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
