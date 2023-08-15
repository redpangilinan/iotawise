import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { verifyActivity } from "@/lib/api/activities"
import { db } from "@/lib/db"

const activityLogCreateSchema = z.object({
  date: z.string(),
  count: z.number(),
})

const routeContextSchema = z.object({
  params: z.object({
    activityId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    const { params } = routeContextSchema.parse(context)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    // Get all of logs for the activity
    const logs = await db.activityLog.findMany({
      select: {
        id: true,
        date: true,
        count: true,
      },
      where: {
        activityId: params.activityId,
      },
    })

    return new Response(JSON.stringify(logs))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    const { params } = routeContextSchema.parse(context)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    // Create new log for the selected activity
    const json = await req.json()
    const body = activityLogCreateSchema.parse(json)

    const logs = await db.activityLog.create({
      data: {
        date: body.date,
        count: body.count,
        activityId: params.activityId,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(logs))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
