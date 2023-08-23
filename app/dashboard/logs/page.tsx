import { Metadata } from "next"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

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

  const currentDate = new Date()
  const daysAgo = new Date(currentDate)
  daysAgo.setDate(currentDate.getDate() - 7)

  const logs = await db.activityLog.findMany({
    select: {
      id: true,
      date: true,
      count: true,
      activity: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      date: {
        gte: daysAgo.toISOString(),
        lte: currentDate.toISOString(),
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  return (
    <Shell>
      <DashboardHeader heading="Logs" text="View activity logs." />
      <div className="w-full overflow-x-auto">
        <DataTable columns={logColumns} data={logs}>
          Last 7 days
        </DataTable>
      </div>
    </Shell>
  )
}
