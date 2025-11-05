"use client"

import { useRoadmapStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function OKRAlignmentChart() {
  const { features, okrs } = useRoadmapStore()

  const activeFeatures = features.filter((f) => f.status !== "archived" && f.status !== "completed")

  const alignedFeatures = activeFeatures.filter((f) => f.okrIds.length > 0).length
  const unalignedFeatures = activeFeatures.length - alignedFeatures

  const data = [
    { name: "Aligned to OKRs", value: alignedFeatures, color: "hsl(var(--chart-1))" },
    { name: "Not Aligned", value: unalignedFeatures, color: "hsl(var(--chart-5))" },
  ]

  const objectives = okrs.filter((o) => o.type === "objective")
  const okrData = objectives.map((obj) => {
    const linkedCount = features.filter((f) => f.okrIds.includes(obj.id)).length
    return {
      name: obj.title.length > 25 ? obj.title.substring(0, 25) + "..." : obj.title,
      value: linkedCount,
    }
  })

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Feature Alignment</CardTitle>
          <CardDescription>Features aligned to strategic objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
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
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Alignment Rate</span>
              <span className="font-semibold text-foreground">
                {activeFeatures.length > 0 ? ((alignedFeatures / activeFeatures.length) * 100).toFixed(0) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Active Features</span>
              <span className="font-semibold text-foreground">{activeFeatures.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features per Objective</CardTitle>
          <CardDescription>Distribution of features across OKRs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {okrData.map((item, index) => {
              const total = okrData.reduce((sum, d) => sum + d.value, 0)
              const percentage = total > 0 ? (item.value / total) * 100 : 0
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium truncate">{item.name}</span>
                    <span className="text-muted-foreground shrink-0 ml-2">
                      {item.value} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {okrData.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No objectives with linked features</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
