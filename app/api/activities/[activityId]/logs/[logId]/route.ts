import * as z from "zod"

import { verifyActivity } from "@/lib/api/activities"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    activityId: z.string(),
    logId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the log
    await db.activityLog.delete({
      where: {
        id: params.logId as string,
        activity: {
          id: params.activityId as string,
        },
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
