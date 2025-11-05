import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const feature = await db.features.findById(Number.parseInt(id))

    if (!feature) {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 })
    }

    return NextResponse.json(feature)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feature" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const feature = await db.features.update(Number.parseInt(id), body)

    if (!feature) {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 })
    }

    // Log activity
    await db.activityLogs.create({
      entity_type: "feature",
      entity_id: feature.id,
      action: "updated",
      user_name: body.owner || "System",
      details: body,
    })

    return NextResponse.json(feature)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update feature" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.features.delete(Number.parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete feature" }, { status: 500 })
  }
}
