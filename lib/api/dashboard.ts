import {
  getLogs,
  getStreak,
  getTotalLogs,
  getMostLoggedActivity,
  getDailyAverage,
} from "@/lib/api/logs"

export async function getDashboardData(userId: string) {
  const [logs, streak, totalLogs, mostLoggedActivity] = await Promise.all([
    getLogs(userId, 365, "user"),
    getStreak(userId, "user"),
    getTotalLogs(userId, "user"),
    getMostLoggedActivity(userId),
  ])

  return {
    logs,
    streak,
    totalLogs,
    mostLoggedActivity,
  }
}

export async function getStatsDashboardData(activityId: string) {
  const [logs, streak, totalLogs, dailyAverage] = await Promise.all([
    getLogs(activityId, 365, "activity"),
    getStreak(activityId, "activity"),
    getTotalLogs(activityId, "activity"),
    getDailyAverage(activityId),
  ])

  return {
    logs,
    streak,
    totalLogs,
    dailyAverage,
  }
}
