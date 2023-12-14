import { Metadata } from "next"
import { redirect } from "next/navigation"

import { getDashboardData } from "@/lib/api/dashboard"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { dateRangeParams } from "@/lib/utils"
import { logColumns } from "@/components/activity/logs/logs-columns"
import { LineChartComponent } from "@/components/charts/linechart"
import { PieChartComponent } from "@/components/charts/piechart"
import { DataTable } from "@/components/data-table"
import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/layout/shell"
import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor your progress.",
}

interface DashboardProps {
  searchParams: { from: string; to: string }
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const dateRange = dateRangeParams(searchParams)
  const dashboardData = await getDashboardData(user.id, dateRange)

  return (
    <Shell>
      <DashboardHeader heading="Dashboard" text="Monitor your progress.">
        <DateRangePicker />
      </DashboardHeader>
      <DashboardCards data={dashboardData} searchParams={searchParams} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LineChartComponent data={dashboardData.activityCountByDate} />
        <PieChartComponent data={dashboardData.topActivities} />
      </div>
      <DataTable columns={logColumns} data={dashboardData.logs}>
        Log History
      </DataTable>
    </Shell>
  )
}
