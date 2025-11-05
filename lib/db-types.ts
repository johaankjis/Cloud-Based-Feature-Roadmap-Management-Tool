// Database type definitions for Feature Roadmap Management Tool

export type FeatureStatus = "backlog" | "planned" | "in-progress" | "completed" | "archived"
export type SprintStatus = "planned" | "active" | "completed"
export type OKRType = "objective" | "key-result"

export interface Feature {
  id: number
  title: string
  description: string | null
  status: FeatureStatus
  reach: number
  impact: number
  confidence: number
  effort: number
  rice_score: number
  priority: number
  category: string | null
  tags: string[] | null
  created_at: Date
  updated_at: Date
  target_quarter: string | null
  owner: string | null
  team: string | null
}

export interface OKR {
  id: number
  title: string
  description: string | null
  type: OKRType
  parent_id: number | null
  target_value: number | null
  current_value: number
  progress: number
  quarter: string | null
  year: number | null
  owner: string | null
  created_at: Date
  updated_at: Date
}

export interface FeatureOKRMapping {
  id: number
  feature_id: number
  okr_id: number
  alignment_score: number
  created_at: Date
}

export interface Sprint {
  id: number
  name: string
  goal: string | null
  start_date: Date
  end_date: Date
  status: SprintStatus
  velocity: number
  team: string | null
  created_at: Date
  updated_at: Date
}

export interface SprintFeature {
  id: number
  sprint_id: number
  feature_id: number
  story_points: number
  created_at: Date
}

export interface ActivityLog {
  id: number
  entity_type: string
  entity_id: number
  action: string
  user_name: string | null
  details: Record<string, any> | null
  created_at: Date
}

// Extended types with relations
export interface FeatureWithOKRs extends Feature {
  okrs?: (OKR & { alignment_score: number })[]
}

export interface FeatureWithSprint extends Feature {
  sprint?: Sprint
  story_points?: number
}

export interface OKRWithKeyResults extends OKR {
  key_results?: OKR[]
}

export interface SprintWithFeatures extends Sprint {
  features?: FeatureWithSprint[]
  total_story_points?: number
}
