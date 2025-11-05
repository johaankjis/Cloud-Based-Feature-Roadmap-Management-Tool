import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const sprints = await db.sprints.findAll()
    return NextResponse.json(sprints)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sprints" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const sprint = await db.sprints.create(body)

    await db.activityLogs.create({
      entity_type: "sprint",
      entity_id: sprint.id,
      action: "created",
      user_name: "System",
      details: { name: sprint.name },
    })

    return NextResponse.json(sprint, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create sprint" }, { status: 500 })
  }
}
