"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function StatusDistribution() {
  const { features } = useRoadmapStore()

  const statusCounts = features.reduce(
    (acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = [
    { name: "Backlog", value: statusCounts.backlog || 0, color: "hsl(var(--chart-5))" },
    { name: "Planned", value: statusCounts.planned || 0, color: "hsl(var(--chart-2))" },
    { name: "In Progress", value: statusCounts["in-progress"] || 0, color: "hsl(var(--chart-3))" },
    { name: "Completed", value: statusCounts.completed || 0, color: "hsl(var(--chart-1))" },
    { name: "Archived", value: statusCounts.archived || 0, color: "hsl(var(--chart-4))" },
  ].filter((d) => d.value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Status Distribution</CardTitle>
        <CardDescription>Current state of all features in the roadmap</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
