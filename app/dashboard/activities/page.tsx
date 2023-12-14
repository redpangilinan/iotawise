import { Metadata } from "next"
import { redirect } from "next/navigation"

import { getUserActivities } from "@/lib/api/activities"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ActivityAddButton } from "@/components/activity/activity-add-button"
import { ActivityItem } from "@/components/activity/activity-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Activities",
  description: "Manage account activities/hobbies.",
}

export default async function ActivitiesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activities = await getUserActivities(user.id)

  return (
    <Shell>
      <DashboardHeader heading="Activities" text="Manage account activities.">
        <ActivityAddButton />
      </DashboardHeader>
      {activities?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Icons.activity className="h-10 w-10" />
          </div>
          <EmptyPlaceholder.Title>No activities created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Add an activity to start monitoring your progress.
          </EmptyPlaceholder.Description>
          <ActivityAddButton variant="outline" />
        </EmptyPlaceholder>
      )}
    </Shell>
  )
}
