import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const activityCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  colorCode: z.string(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Get all of current user's activities
    const activities = await db.activity.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        colorCode: true,
        createdAt: true,
      },
      where: {
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify(activities))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Create new activity for authenticated user
    const json = await req.json()
    const body = activityCreateSchema.parse(json)

    const activity = await db.activity.create({
      data: {
        name: body.name,
        description: body.description,
        colorCode: body.colorCode,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(activity))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
