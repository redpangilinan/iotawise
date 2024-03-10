import { Activity, User } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

type UserActivities = Activity & {
  total_count: number
}

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

// Fetch all of the activities for the selected user
export async function getUserActivities(
  userId: string
): Promise<UserActivities[]> {
  const results: UserActivities[] = await db.$queryRaw`
    SELECT
      A.id,
      A.name,
      A.description,
      A.color_code AS "colorCode",
      A.created_at AS "createdAt",
      SUM(AL.count) AS total_count
    FROM
      activities A
    LEFT JOIN
      activity_log AL ON A.id = AL.activity_id
    WHERE
      A.user_id = ${userId}
    GROUP BY
      A.id, A.name, A.description, A.color_code
    ORDER BY
      total_count DESC;`

  return results.map((result) => ({
    ...result,
    total_count: Number(result.total_count),
  }))
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
