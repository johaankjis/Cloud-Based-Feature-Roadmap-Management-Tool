// Database connection utility (mock for MVP - replace with actual DB in production)

import type { Feature, OKR, Sprint, FeatureOKRMapping, SprintFeature, ActivityLog } from "./db-types"

// In-memory storage for MVP (replace with actual PostgreSQL connection)
let features: Feature[] = []
let okrs: OKR[] = []
let sprints: Sprint[] = []
let featureOKRMappings: FeatureOKRMapping[] = []
let sprintFeatures: SprintFeature[] = []
let activityLogs: ActivityLog[] = []

// Initialize with seed data
export function initializeDatabase() {
  // This would be replaced with actual database queries
  // For now, we'll use the API routes to populate data
}

export const db = {
  features: {
    findAll: async () => features,
    findById: async (id: number) => features.find((f) => f.id === id),
    create: async (data: Omit<Feature, "id" | "rice_score" | "created_at" | "updated_at">) => {
      const rice_score = data.effort > 0 ? (data.reach * data.impact * data.confidence) / 100 / data.effort : 0
      const feature: Feature = {
        ...data,
        id: features.length + 1,
        rice_score,
        created_at: new Date(),
        updated_at: new Date(),
      }
      features.push(feature)
      return feature
    },
    update: async (id: number, data: Partial<Feature>) => {
      const index = features.findIndex((f) => f.id === id)
      if (index === -1) return null

      const updated = { ...features[index], ...data, updated_at: new Date() }
      if (
        data.reach !== undefined ||
        data.impact !== undefined ||
        data.confidence !== undefined ||
        data.effort !== undefined
      ) {
        updated.rice_score =
          updated.effort > 0 ? (updated.reach * updated.impact * updated.confidence) / 100 / updated.effort : 0
      }
      features[index] = updated
      return updated
    },
    delete: async (id: number) => {
      features = features.filter((f) => f.id !== id)
      return true
    },
  },
  okrs: {
    findAll: async () => okrs,
    findById: async (id: number) => okrs.find((o) => o.id === id),
    create: async (data: Omit<OKR, "id" | "progress" | "created_at" | "updated_at">) => {
      const progress =
        data.target_value && data.target_value > 0
          ? Math.min(100, Math.round((data.current_value / data.target_value) * 100))
          : 0
      const okr: OKR = {
        ...data,
        id: okrs.length + 1,
        progress,
        created_at: new Date(),
        updated_at: new Date(),
      }
      okrs.push(okr)
      return okr
    },
    update: async (id: number, data: Partial<OKR>) => {
      const index = okrs.findIndex((o) => o.id === id)
      if (index === -1) return null

      const updated = { ...okrs[index], ...data, updated_at: new Date() }
      if (data.current_value !== undefined || data.target_value !== undefined) {
        updated.progress =
          updated.target_value && updated.target_value > 0
            ? Math.min(100, Math.round((updated.current_value / updated.target_value) * 100))
            : 0
      }
      okrs[index] = updated
      return updated
    },
  },
  sprints: {
    findAll: async () => sprints,
    findById: async (id: number) => sprints.find((s) => s.id === id),
    create: async (data: Omit<Sprint, "id" | "created_at" | "updated_at">) => {
      const sprint: Sprint = {
        ...data,
        id: sprints.length + 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
      sprints.push(sprint)
      return sprint
    },
    update: async (id: number, data: Partial<Sprint>) => {
      const index = sprints.findIndex((s) => s.id === id)
      if (index === -1) return null
      sprints[index] = { ...sprints[index], ...data, updated_at: new Date() }
      return sprints[index]
    },
  },
  featureOKRMappings: {
    findByFeatureId: async (featureId: number) => featureOKRMappings.filter((m) => m.feature_id === featureId),
    create: async (data: Omit<FeatureOKRMapping, "id" | "created_at">) => {
      const mapping: FeatureOKRMapping = {
        ...data,
        id: featureOKRMappings.length + 1,
        created_at: new Date(),
      }
      featureOKRMappings.push(mapping)
      return mapping
    },
  },
  sprintFeatures: {
    findBySprintId: async (sprintId: number) => sprintFeatures.filter((sf) => sf.sprint_id === sprintId),
    create: async (data: Omit<SprintFeature, "id" | "created_at">) => {
      const sprintFeature: SprintFeature = {
        ...data,
        id: sprintFeatures.length + 1,
        created_at: new Date(),
      }
      sprintFeatures.push(sprintFeature)
      return sprintFeature
    },
  },
  activityLogs: {
    findByEntity: async (entityType: string, entityId: number) =>
      activityLogs.filter((log) => log.entity_type === entityType && log.entity_id === entityId),
    create: async (data: Omit<ActivityLog, "id" | "created_at">) => {
      const log: ActivityLog = {
        ...data,
        id: activityLogs.length + 1,
        created_at: new Date(),
      }
      activityLogs.push(log)
      return log
    },
  },
}

// Export setters for seeding
export function setFeatures(data: Feature[]) {
  features = data
}
export function setOKRs(data: OKR[]) {
  okrs = data
}
export function setSprints(data: Sprint[]) {
  sprints = data
}
export function setFeatureOKRMappings(data: FeatureOKRMapping[]) {
  featureOKRMappings = data
}
export function setSprintFeatures(data: SprintFeature[]) {
  sprintFeatures = data
}
export function setActivityLogs(data: ActivityLog[]) {
  activityLogs = data
}
