"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { LogsDeleteDialog } from "./logs-delete-dialog"

interface LogsDeleteButtonProps {
  logs: {
    id: string
    date: Date
    count: number
    activity: {
      id: string
      name: string
    }
  }
}

async function deleteActivity(activityId: string, logsId: string) {
  const response = await fetch(`/api/activities/${activityId}/logs/${logsId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your log was not deleted. Please try again.",
      variant: "destructive",
    })
  } else {
    toast({
      description: "Your log has been deleted successfully.",
    })
  }

  return true
}

export function LogsDeleteButton({ logs }: LogsDeleteButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const handleDelete = async () => {
    setIsDeleteLoading(true)
    const deleted = await deleteActivity(logs.activity.id, logs.id)

    if (deleted) {
      setIsDeleteLoading(false)
      setShowDeleteAlert(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => setShowDeleteAlert(true)}
        disabled={isDeleteLoading}
      >
        <Icons.trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
      <LogsDeleteDialog
        logDate={logs.date}
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={handleDelete}
        isLoading={isDeleteLoading}
      />
    </>
  )
}
