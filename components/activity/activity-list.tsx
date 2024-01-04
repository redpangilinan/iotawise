import { Activity } from "@prisma/client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Icons } from "@/components/icons"

import { ActivityAddButton } from "./activity-add-button"
import { ActivityItem } from "./activity-item"

interface ActivityListProps {
  activities: Activity[]
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <>
      {activities?.length ? (
        <>
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </>
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
    </>
  )
}
