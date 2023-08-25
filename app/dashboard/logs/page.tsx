import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserLogs } from "@/lib/api/logs"

import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { Shell } from "@/components/layout/shell"
import { DataTable } from "@/components/data-table"
import { logColumns } from "@/components/activity/logs/logs-columns"

export const metadata: Metadata = {
  title: "Logs",
  description: "View and modify activity logs.",
}

export default async function LogsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const logs = await getUserLogs(user.id, 7)

  return (
    <Shell>
      <DashboardHeader heading="Logs" text="View activity logs." />
      <DataTable columns={logColumns} data={logs}>
        Last 7 days
      </DataTable>
    </Shell>
  )
}
