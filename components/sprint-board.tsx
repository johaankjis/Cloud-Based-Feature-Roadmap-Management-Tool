"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users } from "lucide-react"
import { format } from "date-fns"

export function SprintBoard() {
  const { sprints, features, updateFeature } = useRoadmapStore()

  const getSprintFeatures = (sprintId: string) => {
    return features.filter((f) => f.sprintId === sprintId)
  }

  const getBacklogFeatures = () => {
    return features.filter((f) => !f.sprintId && f.status !== "completed" && f.status !== "archived")
  }

  const statusColors = {
    planning: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    completed: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  }

  const handleMoveToSprint = (featureId: string, sprintId: string | null) => {
    updateFeature(featureId, { sprintId })
  }

  return (
    <div className="space-y-6">
      {/* Backlog */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Backlog
            </CardTitle>
            <Badge variant="outline" className="bg-muted text-foreground">
              {getBacklogFeatures().length} features
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {getBacklogFeatures()
              .sort((a, b) => b.riceScore - a.riceScore)
              .map((feature) => (
                <Card key={feature.id} className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm text-foreground line-clamp-2">{feature.title}</h4>
                        <Badge
                          variant="outline"
                          className="text-xs bg-primary/10 text-primary border-primary/20 shrink-0"
                        >
                          {feature.riceScore.toFixed(0)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {sprints
                          .filter((s) => s.status !== "completed")
                          .map((sprint) => (
                            <Button
                              key={sprint.id}
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-transparent"
                              onClick={() => handleMoveToSprint(feature.id, sprint.id)}
                            >
                              → {sprint.name.replace("Sprint ", "S")}
                            </Button>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {getBacklogFeatures().length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full text-center py-8">No features in backlog</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sprints */}
      {sprints.map((sprint) => {
        const sprintFeatures = getSprintFeatures(sprint.id)
        const completedCount = sprintFeatures.filter((f) => f.status === "completed").length
        const inProgressCount = sprintFeatures.filter((f) => f.status === "in-progress").length

        return (
          <Card key={sprint.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{sprint.name}</CardTitle>
                    <Badge variant="outline" className={statusColors[sprint.status]}>
                      {sprint.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(sprint.startDate), "MMM d")} - {format(new Date(sprint.endDate), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Capacity: {sprint.capacity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {completedCount}/{sprintFeatures.length}
                  </div>
                  <div className="text-xs text-muted-foreground">completed</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sprintFeatures.map((feature) => (
                  <Card key={feature.id} className="bg-card/50">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-foreground line-clamp-2">{feature.title}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs shrink-0 ${
                              feature.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : feature.status === "in-progress"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            }`}
                          >
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            RICE: {feature.riceScore.toFixed(0)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleMoveToSprint(feature.id, null)}
                          >
                            → Backlog
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {sprintFeatures.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-full text-center py-8">
                    No features in this sprint
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
