import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserActivity } from "@/lib/api/activities"
import { getStatsDashboardData } from "@/lib/api/dashboard"

import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { StatsCards } from "@/components/activity/stats/stats-cards"

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

  return (
    <Shell>
      <DashboardHeader
        heading={`${activity.name} Stats`}
        text={activity.description}
      />
      <div>
        <StatsCards data={dashboardData} />
      </div>
    </Shell>
  )
}
