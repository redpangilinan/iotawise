import { ActivityByDate, ActivityEntry, DateRange } from "@/types"

import { db } from "@/lib/db"

export async function getLogs(
  id: string,
  dateRange: DateRange,
  type: "user" | "activity"
) {
  const typeCondition =
    type === "activity" ? { activityId: id } : { activity: { userId: id } }

  return await db.activityLog.findMany({
    select: {
      id: true,
      date: true,
      count: true,
      activity: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
      ...typeCondition,
    },
    orderBy: {
      date: "desc",
    },
  })
}

export async function getStreak(
  id: string,
  type: "user" | "activity"
): Promise<{
  currentStreak: number
  longestStreak: number
}> {
  const typeCondition =
    type === "activity" ? { activityId: id } : { activity: { userId: id } }

  const logs = await db.activityLog.findMany({
    where: typeCondition,
    distinct: "date",
    orderBy: { date: "asc" },
  })

  if (logs.length === 0) {
    return { longestStreak: 0, currentStreak: 0 }
  }

  let currentStreak = 1
  let longestStreak = 1

  const oneDay = 24 * 60 * 60 * 1000

  for (let i = 0; i < logs.length - 1; i++) {
    const latestDate = new Date(logs[i].date).getTime()
    const nextDate = new Date(logs[i + 1].date).getTime()

    const timeDiff = latestDate - nextDate

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

  // Reset streak if user is inactive
  const lastLogDate = new Date(logs[logs.length - 1].date).getTime()
  const currentDate = new Date().getTime()
  const timeDiff = currentDate - lastLogDate

  if (Math.abs(timeDiff) > oneDay * 2) {
    currentStreak = 0
  }

  return { longestStreak, currentStreak }
}

export async function getTotalLogs(
  id: string,
  dateRange: DateRange,
  type: "user" | "activity"
) {
  const typeCondition =
    type === "activity" ? { activityId: id } : { activity: { userId: id } }

  const logs = await db.activityLog.findMany({
    where: {
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
      ...typeCondition,
    },
    select: {
      count: true,
    },
  })

  if (logs.length === 0) {
    return 0
  }

  let totalCount = 0

  for (const log of logs) {
    totalCount += log.count
  }

  return totalCount
}

export async function getMostLoggedActivity(
  userId: string,
  dateRange: DateRange
) {
  const logs = await db.activityLog.groupBy({
    by: ["activityId"],
    _sum: {
      count: true,
    },
    orderBy: {
      _sum: {
        count: "desc",
      },
    },
    where: {
      activity: {
        userId: userId,
      },
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
  })

  if (logs.length === 0) {
    return "N/A"
  }

  const mostLoggedActivityId = logs[0].activityId
  const mostLoggedActivity = await db.activity.findUnique({
    select: {
      name: true,
    },
    where: {
      id: mostLoggedActivityId,
    },
  })

  return mostLoggedActivity?.name
}

export async function getTopActivities(
  userId: string,
  dateRange: DateRange
): Promise<ActivityEntry[]> {
  const logs = await db.activityLog.groupBy({
    by: ["activityId"],
    _sum: {
      count: true,
    },
    orderBy: {
      _sum: {
        count: "desc",
      },
    },
    where: {
      activity: {
        userId: userId,
      },
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
  })

  const topActivities = await Promise.all(
    logs.slice(0, 10).map(async (log) => {
      const activity = await db.activity.findUnique({
        where: {
          id: log.activityId,
        },
      })
      return {
        name: activity?.name || "N/A",
        count: log._sum.count,
        color: activity?.colorCode || "#FFFFFF",
      }
    })
  )

  return topActivities
}

export async function getActivityCountByDate(
  userId: string,
  dateRange: DateRange
): Promise<ActivityByDate[]> {
  const logs = await db.activityLog.groupBy({
    by: ["date"],
    _sum: {
      count: true,
    },
    orderBy: {
      date: "asc",
    },
    where: {
      activity: {
        userId: userId,
      },
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
  })

  const dateMap = new Map<string, number>()

  logs.forEach((log) => {
    dateMap.set(log.date.toISOString(), log._sum.count ?? 0)
  })

  let earliestNonZeroDate = null
  for (const log of logs) {
    if (log._sum.count !== 0) {
      earliestNonZeroDate = log.date
      break
    }
  }

  const result: ActivityByDate[] = []

  if (earliestNonZeroDate) {
    let currentDate = new Date(earliestNonZeroDate)

    while (currentDate <= new Date(dateRange.to)) {
      const currentDateISOString = currentDate.toISOString()
      result.push({
        date: currentDateISOString,
        count: dateMap.get(currentDateISOString) ?? 0,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  return result
}

export async function getDailyAverage(
  activityId: string,
  dateRange: DateRange
): Promise<number> {
  const logs = await db.activityLog.findMany({
    where: {
      activityId: activityId,
      date: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const totalCount = logs.reduce((sum, log) => sum + log.count, 0)

  if (totalCount === 0) {
    return 0
  }

  const oldestDate = new Date(logs[0].date)
  const today = new Date(dateRange.to.toISOString())
  const timePeriodInDays = Math.ceil(
    (today.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const dailyAverage = totalCount / timePeriodInDays

  if (Number.isInteger(dailyAverage)) {
    return dailyAverage
  } else {
    return parseFloat(dailyAverage.toFixed(2))
  }
}
