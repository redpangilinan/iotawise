import { db } from "@/lib/db"

export async function getStreak(
  userId: string,
  streakType: "longest" | "current"
): Promise<number> {
  const logs = await db.activityLog.findMany({
    where: { activity: { userId } },
    distinct: "date",
    orderBy: { date: "asc" },
  })

  if (logs.length === 0) {
    return 0
  }

  let currentStreak = 1
  let longestStreak = 1

  for (let i = 0; i < logs.length - 1; i++) {
    const currentDate = new Date(logs[i].date).getTime()
    const nextDate = new Date(logs[i + 1].date).getTime()

    const timeDiff = currentDate - nextDate
    const oneDay = 24 * 60 * 60 * 1000

    if (Math.abs(timeDiff) <= oneDay) {
      currentStreak++
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak
      }
      currentStreak = 1
    }
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak
  }

  if (streakType === "longest") {
    return longestStreak
  } else if (streakType === "current") {
    return currentStreak
  } else {
    throw new Error("Invalid streak type")
  }
}

export async function getTotalLogs(userId: string) {
  const logs = await db.activityLog.findMany({
    where: {
      activity: {
        userId: userId
      }
    },
    select: {
      count: true
    }
  });

  if (logs.length === 0) {
    return 0;
  }

  let totalCount = 0;

  for (const log of logs) {
    totalCount += log.count;
  }

  return totalCount;
}

export async function getMostLoggedActivity(userId: string) {
  const logs = await db.activityLog.groupBy({
    by: ['activityId'],
    _sum: {
      count: true,
    },
    orderBy: {
      _sum: {
        count: 'desc',
      },
    },
    where: {
      activity: {
        userId: userId,
      },
    },
  });

  if (logs.length === 0) {
    return "N/A";
  }

  const mostLoggedActivityId = logs[0].activityId;
  const mostLoggedActivity = await db.activity.findUnique({
    where: {
      id: mostLoggedActivityId
    }
  });

  return mostLoggedActivity?.name;
}
