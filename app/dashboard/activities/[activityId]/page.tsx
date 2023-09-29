import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserActivity } from "@/lib/api/activities"
import { getStatsDashboardData } from "@/lib/api/dashboard"
import { cn, dateRangeParams } from "@/lib/utils"

import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { DataTable } from "@/components/data-table"
import { ActivityOperations } from "@/components/activity/activity-operations"
import { StatsCards } from "@/components/activity/stats/stats-cards"
import { logColumns } from "@/components/activity/logs/logs-columns"
import { Heatmap } from "@/components/charts/heatmap"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DateRangePicker } from "@/components/date-range-picker"

interface ActivityPageProps {
  params: { activityId: string }
  searchParams: { from: string; to: string }
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activity = await getUserActivity(params.activityId, user.id)

  return {
    title: activity?.name || "Not Found",
    description: activity?.description,
  }
}

export default async function ActivityPage({
  params,
  searchParams,
}: ActivityPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activity = await getUserActivity(params.activityId, user.id)

  if (!activity) {
    notFound()
  }

  const dateRange = dateRangeParams(searchParams)

  const dashboardData = await getStatsDashboardData(activity.id, dateRange)

  return (
    <Shell>
      <DashboardHeader
        heading={`${activity.name} Stats`}
        text={activity.description}
      >
        <div className="flex flex-col items-stretch gap-2 md:items-end">
          <DateRangePicker />
          <ActivityOperations
            activity={{
              id: activity.id,
            }}
          >
            <div
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <Icons.down className="mr-2 h-4 w-4" />
              Actions
            </div>
          </ActivityOperations>
        </div>
      </DashboardHeader>
      <Heatmap data={dashboardData.logs} params={params} />
      <StatsCards data={dashboardData} searchParams={searchParams} />
      <DataTable columns={logColumns} data={dashboardData.logs}>
        Log History
      </DataTable>
    </Shell>
  )
}
