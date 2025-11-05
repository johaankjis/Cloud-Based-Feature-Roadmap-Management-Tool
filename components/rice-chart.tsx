"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function RiceChart() {
  const { features } = useRoadmapStore()

  const chartData = features
    .filter((f) => f.status !== "archived")
    .sort((a, b) => b.riceScore - a.riceScore)
    .slice(0, 10)
    .map((f) => ({
      name: f.title.length > 20 ? f.title.substring(0, 20) + "..." : f.title,
      score: Number(f.riceScore.toFixed(1)),
      priority: f.priority,
    }))

  const getColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "hsl(var(--chart-1))"
      case "high":
        return "hsl(var(--chart-2))"
      case "medium":
        return "hsl(var(--chart-3))"
      case "low":
        return "hsl(var(--chart-4))"
      default:
        return "hsl(var(--chart-5))"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Features by RICE Score</CardTitle>
        <CardDescription>Prioritized features based on Reach, Impact, Confidence, and Effort</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 100, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "hsl(var(--popover-foreground))" }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.priority)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
