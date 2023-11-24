"use client"

import Link from "next/link"
import { Activity } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityOperations } from "@/components/activity/activity-operations"

interface ActivityItemProps {
  activity: Pick<
    Activity,
    "id" | "name" | "description" | "colorCode" | "createdAt"
  >
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 rounded-full shadow shadow-black dark:shadow-white"
            data-testid="color-code"
            style={{ backgroundColor: `${activity.colorCode}` }}
          ></div>
          <div>
            <Link
              href={`/dashboard/activities/${activity.id}`}
              className="font-semibold hover:underline"
            >
              {activity.name}
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.createdAt?.toDateString())}
              </p>
            </div>
          </div>
        </div>
        {activity.description ? (
          <div className="text-sm text-muted-foreground">
            {activity.description}
          </div>
        ) : null}
      </div>
      <ActivityOperations
        activity={{
          id: activity.id,
        }}
      />
    </div>
  )
}

ActivityItem.Skeleton = function ActivityItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
