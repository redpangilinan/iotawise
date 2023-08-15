import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Activity, User } from "@prisma/client"
import { db } from "@/lib/db"

// Fetch user's activity
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

// Verify if the user has access to the activity
export async function verifyActivity(activityId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.activity.count({
    where: {
      id: activityId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
