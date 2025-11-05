"use client"

import { create } from "zustand"
import type { Feature, OKR, Sprint } from "./types"
import { mockFeatures, mockOKRs, mockSprints } from "./mock-data"

interface RoadmapStore {
  features: Feature[]
  okrs: OKR[]
  sprints: Sprint[]

  // Feature actions
  addFeature: (feature: Omit<Feature, "id" | "createdAt" | "updatedAt" | "riceScore">) => void
  updateFeature: (id: string, updates: Partial<Feature>) => void
  deleteFeature: (id: string) => void

  // OKR actions
  addOKR: (okr: Omit<OKR, "id">) => void
  updateOKR: (id: string, updates: Partial<OKR>) => void

  // Sprint actions
  addSprint: (sprint: Omit<Sprint, "id">) => void
  updateSprint: (id: string, updates: Partial<Sprint>) => void
}

const calculateRICE = (reach: number, impact: number, confidence: number, effort: number): number => {
  if (effort === 0) return 0
  return (reach * impact * confidence) / effort
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  features: mockFeatures,
  okrs: mockOKRs,
  sprints: mockSprints,

  addFeature: (feature) =>
    set((state) => {
      const riceScore = calculateRICE(feature.reach, feature.impact, feature.confidence, feature.effort)
      const newFeature: Feature = {
        ...feature,
        id: `feat-${Date.now()}`,
        riceScore,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return { features: [...state.features, newFeature] }
    }),

  updateFeature: (id, updates) =>
    set((state) => ({
      features: state.features.map((f) => {
        if (f.id !== id) return f
        const updated = { ...f, ...updates, updatedAt: new Date().toISOString() }
        if ("reach" in updates || "impact" in updates || "confidence" in updates || "effort" in updates) {
          updated.riceScore = calculateRICE(updated.reach, updated.impact, updated.confidence, updated.effort)
        }
        return updated
      }),
    })),

  deleteFeature: (id) =>
    set((state) => ({
      features: state.features.filter((f) => f.id !== id),
    })),

  addOKR: (okr) =>
    set((state) => ({
      okrs: [...state.okrs, { ...okr, id: `okr-${Date.now()}` }],
    })),

  updateOKR: (id, updates) =>
    set((state) => ({
      okrs: state.okrs.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    })),

  addSprint: (sprint) =>
    set((state) => ({
      sprints: [...state.sprints, { ...sprint, id: `sprint-${Date.now()}` }],
    })),

  updateSprint: (id, updates) =>
    set((state) => ({
      sprints: state.sprints.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
}))
