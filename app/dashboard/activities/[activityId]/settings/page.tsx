import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { getUserActivity } from "@/lib/api/activities"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ActivityEditForm } from "@/components/activity/activity-edit-form"
import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Activity Settings",
}

interface ActivityEditProps {
  params: { activityId: string }
}

export default async function ActivityEdit({ params }: ActivityEditProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const activity = await getUserActivity(params.activityId, user.id)

  if (!activity) {
    notFound()
  }

  return (
    <Shell>
      <DashboardHeader
        heading="Activity Settings"
        text="Modify activity details."
      />
      <div className="grid grid-cols-1 gap-10">
        <ActivityEditForm
          activity={{
            id: activity.id,
            name: activity.name,
            description: activity.description,
            colorCode: activity.colorCode,
          }}
        />
      </div>
    </Shell>
  )
}
