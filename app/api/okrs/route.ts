import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const okrs = await db.okrs.findAll()
    return NextResponse.json(okrs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch OKRs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const okr = await db.okrs.create(body)

    await db.activityLogs.create({
      entity_type: "okr",
      entity_id: okr.id,
      action: "created",
      user_name: body.owner || "System",
      details: { title: okr.title },
    })

    return NextResponse.json(okr, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create OKR" }, { status: 500 })
  }
}
