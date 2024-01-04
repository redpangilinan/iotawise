import { getUserActivities } from "@/lib/api/activities"
import {
  getActivityCountByDate,
  getDailyAverage,
  getLogs,
  getMostLoggedActivity,
  getStreak,
  getTopActivities,
  getTotalLogs,
} from "@/lib/api/logs"

type DateRangeType = {
  from: Date
  to: Date
}

export async function getDashboardData(
  userId: string,
  dateRange: DateRangeType
) {
  const [
    logs,
    streak,
    totalLogs,
    mostLoggedActivity,
    activityCountByDate,
    topActivities,
    userActivities,
  ] = await Promise.all([
    getLogs(userId, dateRange, "user"),
    getStreak(userId, "user"),
    getTotalLogs(userId, dateRange, "user"),
    getMostLoggedActivity(userId, dateRange),
    getActivityCountByDate(userId, dateRange),
    getTopActivities(userId, dateRange),
    getUserActivities(userId),
  ])

  return {
    logs,
    streak,
    totalLogs,
    mostLoggedActivity,
    activityCountByDate,
    topActivities,
    userActivities,
  }
}

export async function getStatsDashboardData(
  activityId: string,
  dateRange: DateRangeType
) {
  const [logs, streak, totalLogs, dailyAverage] = await Promise.all([
    getLogs(activityId, dateRange, "activity"),
    getStreak(activityId, "activity"),
    getTotalLogs(activityId, dateRange, "activity"),
    getDailyAverage(activityId, dateRange),
  ])

  return {
    logs,
    streak,
    totalLogs,
    dailyAverage,
  }
}
