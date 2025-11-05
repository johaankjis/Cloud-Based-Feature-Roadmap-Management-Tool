"use client"

import { useState } from "react"
import { useRoadmapStore } from "@/lib/store"
import type { Feature } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { FeatureDialog } from "./feature-dialog"

const statusColors = {
  backlog: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  planned: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
}

const priorityColors = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
}

type SortField = "title" | "riceScore" | "status" | "priority"
type SortDirection = "asc" | "desc"

export function FeatureTable() {
  const { features, deleteFeature } = useRoadmapStore()
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [sortField, setSortField] = useState<SortField>("riceScore")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedFeatures = [...features].sort((a, b) => {
    let aVal: any = a[sortField]
    let bVal: any = b[sortField]

    if (sortField === "title") {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 -ml-3 text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort("title")}
                >
                  Feature
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 -ml-3 text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 -ml-3 text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort("priority")}
                >
                  Priority
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 -ml-3 text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort("riceScore")}
                >
                  RICE Score
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFeatures.map((feature) => (
              <TableRow key={feature.id} className="border-border">
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{feature.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{feature.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[feature.status]}>
                    {feature.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityColors[feature.priority]}>
                    {feature.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{feature.riceScore.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({feature.reach}×{feature.impact}×{feature.confidence}/{feature.effort})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {feature.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-primary/5 text-primary border-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {feature.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">
                        +{feature.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingFeature(feature)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteFeature(feature.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingFeature && (
        <FeatureDialog
          feature={editingFeature}
          open={!!editingFeature}
          onOpenChange={(open) => !open && setEditingFeature(null)}
        />
      )}
    </>
  )
}
