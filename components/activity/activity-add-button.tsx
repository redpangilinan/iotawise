"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

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
import { ButtonProps, buttonVariants } from "@/components/ui/button"
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

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your activity was not created. Please try again.",
        variant: "destructive",
      })
    }

    const activity = await response.json()

    router.refresh()
    router.push(`/dashboard/activities/${activity.id}/settings`)
  }

  return (
    <>
      <button
        onClick={() => setShowAddAlert(true)}
        className={cn(buttonVariants({ variant }), className)}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        New activity
      </button>

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
            <AlertDialogAction
              onClick={onClick}
              className="bg-red-600 focus:ring-red-600"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              <span>Add activity</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
