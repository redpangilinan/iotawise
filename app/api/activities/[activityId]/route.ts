import * as z from "zod"

import { verifyActivity } from "@/lib/api/activities"
import { db } from "@/lib/db"
import { activityPatchSchema } from "@/lib/validations/activity"

const routeContextSchema = z.object({
  params: z.object({
    activityId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = activityPatchSchema.parse(json)

    // Update the activity
    await db.activity.update({
      where: {
        id: params.activityId,
      },
      data: {
        name: body.name,
        description: body.description,
        colorCode: body.colorCode,
        updatedAt: new Date(),
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the activity
    await db.activity.delete({
      where: {
        id: params.activityId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
