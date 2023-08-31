import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getDashboardData } from "@/lib/api/dashboard"

import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards"
import { DataTable } from "@/components/data-table"
import { logColumns } from "@/components/activity/logs/logs-columns"
import { LineChartComponent } from "@/components/charts/linechart"
import { PieChartComponent } from "@/components/charts/piechart"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor your progress.",
}

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const dashboardData = await getDashboardData(user.id)

  return (
    <Shell>
      <DashboardHeader heading="Dashboard" text="Monitor your progress." />
      <DashboardCards data={dashboardData} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LineChartComponent data={dashboardData.activityCountByDate} />
        <PieChartComponent data={dashboardData.topActivities} />
      </div>
      <DataTable columns={logColumns} data={dashboardData.logs}>
        Last year
      </DataTable>
    </Shell>
  )
}
