import { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { formatDate } from "@/lib/utils"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { Shell } from "@/components/layout/shell"
import { Icon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Logs",
  description: "View and modify activity logs.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate)
  sevenDaysAgo.setDate(currentDate.getDate() - 7)

  const logs = await db.activityLog.findMany({
    select: {
      id: true,
      date: true,
      count: true,
      activity: {
        select: {
          name: true,
        },
      },
    },
    where: {
      date: {
        gte: sevenDaysAgo.toISOString(),
        lte: currentDate.toISOString(),
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  return (
    <Shell>
      <DashboardHeader heading="Logs" text="View activity logs. (WIP)" />
      {logs?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <tbody className="divide-y">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(log.date.toDateString())}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {log.activity.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{log.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPlaceholder>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Icon name="history" className="h-10 w-10" />
          </div>
          <EmptyPlaceholder.Title>No logs yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You can add logs in the activities page.
          </EmptyPlaceholder.Description>
          <Link
            href="/dashboard/activities"
            className={`${cn(buttonVariants({ variant: "outline" }))}`}
          >
            <Icon name="activity" className="mr-2 h-4 w-4" />
            Activities
          </Link>
        </EmptyPlaceholder>
      )}
    </Shell>
  )
}
