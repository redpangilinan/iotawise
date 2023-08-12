import { Metadata } from "next"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { Shell } from "@/components/layout/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ActivityItem } from "@/components/activity/activity-item"
import { ActivityAddButton } from "@/components/activity/activity-add-button"
import { Icon } from "@/components/icons"

export const metadata: Metadata = {
  title: "Activities",
  description: "Manage account activities/hobbies.",
}

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activities = await db.activity.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      colorCode: true,
      createdAt: true,
    },
    where: {
      userId: user.id,
    },
  })

  return (
    <Shell>
      <DashboardHeader heading="Activities" text="Manage account activities.">
        <ActivityAddButton />
      </DashboardHeader>
      <div>
        {activities?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Icon name="activity" className="h-10 w-10" />
            </div>
            <EmptyPlaceholder.Title>
              No activities created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Add an activity to start monitoring your progress.
            </EmptyPlaceholder.Description>
            <ActivityAddButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </Shell>
  )
}
