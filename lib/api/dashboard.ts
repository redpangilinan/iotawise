import {
  getStreak,
  getTotalLogs,
  getMostLoggedActivity,
  getDailyAverage,
} from "@/lib/api/logs"

export async function getDashboardData(userId: string) {
  const streak = await getStreak(userId, "user")
  const totalLogs = await getTotalLogs(userId, "user")
  const mostLoggedActivity = await getMostLoggedActivity(userId)

  return {
    streak,
    totalLogs,
    mostLoggedActivity,
  }
}

export async function getStatsDashboardData(activityId: string) {
  const streak = await getStreak(activityId, "activity")
  const totalLogs = await getTotalLogs(activityId, "activity")
  const dailyAverage = await getDailyAverage(activityId)

  return {
    streak,
    totalLogs,
    dailyAverage,
  }
}
