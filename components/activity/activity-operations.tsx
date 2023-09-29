"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { LogsAddForm } from "./logs/logs-add-form"

async function deleteActivity(activityId: string) {
  const response = await fetch(`/api/activities/${activityId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your activity was not deleted. Please try again.",
      variant: "destructive",
    })
  } else {
    toast({
      description: "Your activity has been deleted successfully.",
    })
  }

  return true
}

interface ActivityOperationsProps {
  activity: Pick<Activity, "id">
  children?: React.ReactNode
}

export function ActivityOperations({
  activity,
  children,
}: ActivityOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showLogAlert, setShowLogAlert] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {children ? (
            children
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
              <Icons.ellipsis className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </div>
          )}
        </DropdownMenuTrigger>{" "}
        <></>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setShowLogAlert(true)}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            Add Log
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/activities/${activity.id}/settings`}
              className="flex w-full"
            >
              <Icons.settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:text-red-600"
            onSelect={() => setShowDeleteAlert(true)}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Alert */}
      <AlertDialog open={showLogAlert} onOpenChange={setShowLogAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log Activity</AlertDialogTitle>
            <AlertDialogDescription>
              This will create an activity log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <LogsAddForm
            activityId={activity.id}
            setShowLogAlert={setShowLogAlert}
          />
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this activity?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteActivity(activity.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
