"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp } from "lucide-react"

export function OKRList() {
  const { okrs, features } = useRoadmapStore()

  const objectives = okrs.filter((o) => o.type === "objective")

  const getKeyResults = (objectiveId: string) => {
    return okrs.filter((o) => o.type === "key-result" && o.parentId === objectiveId)
  }

  const getLinkedFeatures = (okrId: string) => {
    return features.filter((f) => f.okrIds.includes(okrId))
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "text-emerald-400"
    if (progress >= 50) return "text-blue-400"
    if (progress >= 25) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-4">
      {objectives.map((objective) => {
        const keyResults = getKeyResults(objective.id)
        const linkedFeatures = getLinkedFeatures(objective.id)

        return (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{objective.title}</CardTitle>
                  </div>
                  <CardDescription>{objective.description}</CardDescription>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-3xl font-bold ${getProgressColor(objective.progress)}`}>
                    {objective.progress}%
                  </div>
                  <div className="text-xs text-muted-foreground">{objective.quarter}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{objective.owner}</span>
                </div>
                <Progress value={objective.progress} className="h-2" />
              </div>

              {keyResults.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Key Results
                  </h4>
                  {keyResults.map((kr) => {
                    const krFeatures = getLinkedFeatures(kr.id)
                    return (
                      <div key={kr.id} className="pl-6 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">{kr.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {kr.currentValue.toLocaleString()} / {kr.targetValue.toLocaleString()}
                            </div>
                          </div>
                          <div className={`text-lg font-semibold ${getProgressColor(kr.progress)}`}>{kr.progress}%</div>
                        </div>
                        <Progress value={kr.progress} className="h-1.5" />
                        {krFeatures.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {krFeatures.map((feature) => (
                              <Badge
                                key={feature.id}
                                variant="outline"
                                className="text-xs bg-primary/5 text-primary border-primary/20"
                              >
                                {feature.title}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {linkedFeatures.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">
                    {linkedFeatures.length} linked feature{linkedFeatures.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {linkedFeatures.map((feature) => (
                      <Badge key={feature.id} variant="outline" className="text-xs bg-muted/50 text-foreground">
                        {feature.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
