import {
  getStreak,
  getTotalLogs,
  getMostLoggedActivity,
  getDailyAverage,
} from "@/lib/api/logs"

export async function getDashboardData(userId: string) {
  const [streak, totalLogs, mostLoggedActivity] = await Promise.all([
    getStreak(userId, "user"),
    getTotalLogs(userId, "user"),
    getMostLoggedActivity(userId),
  ])

  return {
    streak,
    totalLogs,
    mostLoggedActivity,
  }
}

export async function getStatsDashboardData(activityId: string) {
  const [streak, totalLogs, dailyAverage] = await Promise.all([
    getStreak(activityId, "activity"),
    getTotalLogs(activityId, "activity"),
    getDailyAverage(activityId),
  ])

  return {
    streak,
    totalLogs,
    dailyAverage,
  }
}
