import * as React from "react"
import { useRouter } from "next/navigation"

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
import { Icons } from "@/components/icons"

import { formatDate } from "@/lib/utils"

interface LogsDeleteDialogProps {
  logDate?: Date
  open: boolean
  onClose: () => void
  onDelete: () => Promise<void>
  isLoading: boolean
}

export function LogsDeleteDialog({
  logDate,
  open,
  onClose,
  onDelete,
  isLoading,
}: LogsDeleteDialogProps) {
  const router = useRouter()

  if (!logDate) {
    return null
  }

  const handleDelete = async () => {
    await onDelete()
    onClose()
    router.refresh()
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete the logs from {formatDate(logDate.toLocaleDateString())}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 focus:ring-red-600"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
