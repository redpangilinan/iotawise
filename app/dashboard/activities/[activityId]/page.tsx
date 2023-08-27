import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserActivity } from "@/lib/api/activities"
import { getStatsDashboardData } from "@/lib/api/dashboard"
import { getLogs } from "@/lib/api/logs"

import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { DataTable } from "@/components/data-table"
import { StatsCards } from "@/components/activity/stats/stats-cards"
import { logColumns } from "@/components/activity/logs/logs-columns"
import { Heatmap } from "@/components/heatmap"

export const metadata: Metadata = {
  title: "Activity",
}

interface ActivityPageProps {
  params: { activityId: string }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activity = await getUserActivity(params.activityId, user.id)

  if (!activity) {
    notFound()
  }

  const dashboardData = await getStatsDashboardData(params.activityId)
  const logs = await getLogs(params.activityId, 365, "activity")

  return (
    <Shell>
      <DashboardHeader
        heading={`${activity.name} Stats`}
        text={activity.description}
      />
      <Heatmap data={logs} params={params} />
      <StatsCards data={dashboardData} />
      <DataTable columns={logColumns} data={logs}>
        Last year
      </DataTable>
    </Shell>
  )
}
