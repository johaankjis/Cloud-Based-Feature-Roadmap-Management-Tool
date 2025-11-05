import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const features = await db.features.findAll()
    return NextResponse.json(features)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const feature = await db.features.create(body)

    // Log activity
    await db.activityLogs.create({
      entity_type: "feature",
      entity_id: feature.id,
      action: "created",
      user_name: body.owner || "System",
      details: { title: feature.title },
    })

    return NextResponse.json(feature, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create feature" }, { status: 500 })
  }
}
