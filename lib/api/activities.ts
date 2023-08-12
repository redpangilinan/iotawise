import { Activity, User } from "@prisma/client"
import { db } from "@/lib/db"

export async function getUserActivity(
  activityId: Activity["id"],
  userId: User["id"]
) {
  return await db.activity.findFirst({
    where: {
      id: activityId,
      userId: userId,
    },
  })
}
