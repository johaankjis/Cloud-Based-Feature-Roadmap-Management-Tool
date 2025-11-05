export type FeatureStatus = "backlog" | "planned" | "in-progress" | "completed" | "archived"
export type FeaturePriority = "critical" | "high" | "medium" | "low"

export interface Feature {
  id: string
  title: string
  description: string
  status: FeatureStatus
  priority: FeaturePriority
  reach: number
  impact: number
  confidence: number
  effort: number
  riceScore: number
  okrIds: string[]
  sprintId: string | null
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface OKR {
  id: string
  title: string
  description: string
  type: "objective" | "key-result"
  parentId: string | null
  targetValue: number
  currentValue: number
  progress: number
  quarter: string
  owner: string
}

export interface Sprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: "planning" | "active" | "completed"
  capacity: number
  velocity: number
}
