import { getStreak, getTotalLogs, getMostLoggedActivity } from "@/lib/api/logs"

export async function getDashboardData(userId: string) {
  const streak = await getStreak(userId);
  const totalLogs = await getTotalLogs(userId);
  const mostLoggedActivity = await getMostLoggedActivity(userId);

  return {
    streak,
    totalLogs,
    mostLoggedActivity,
  };
}
