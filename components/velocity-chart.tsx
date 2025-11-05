"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function VelocityChart() {
  const { sprints, features } = useRoadmapStore()

  const chartData = sprints.map((sprint) => {
    const sprintFeatures = features.filter((f) => f.sprintId === sprint.id)
    const completedInSprint = sprintFeatures.filter((f) => f.status === "completed").length

    return {
      name: sprint.name.replace("Sprint ", "S"),
      planned: sprint.capacity,
      completed: sprint.status === "completed" ? sprint.velocity : completedInSprint,
      velocity: sprint.velocity,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint Velocity</CardTitle>
        <CardDescription>Planned capacity vs actual velocity across sprints</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="planned"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Planned Capacity"
            />
            <Line
              type="monotone"
              dataKey="velocity"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Actual Velocity"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
