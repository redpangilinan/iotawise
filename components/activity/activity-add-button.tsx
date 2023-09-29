"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ActivityAddButtonProps extends ButtonProps {}

export function ActivityAddButton({
  className,
  variant,
  ...props
}: ActivityAddButtonProps) {
  const router = useRouter()
  const [showAddAlert, setShowAddAlert] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Activity",
        colorCode: "#ffffff",
      }),
    })

    if (!response?.ok) {
      setIsLoading(false)
      setShowAddAlert(false)

      return toast({
        title: "Something went wrong.",
        description: "Your activity was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "A new activity has been created successfully.",
    })

    const activity = await response.json()

    setIsLoading(false)
    setShowAddAlert(false)

    router.push(`/dashboard/activities/${activity.id}/settings`)
    router.refresh()
  }

  return (
    <>
      <Button onClick={() => setShowAddAlert(true)}>
        <Icons.add className="mr-2 h-4 w-4" />
        New activity
      </Button>

      {/* Add Alert */}
      <AlertDialog open={showAddAlert} onOpenChange={setShowAddAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to create a new activity?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will add a new activity to your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={onClick} disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              <span>Add activity</span>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
