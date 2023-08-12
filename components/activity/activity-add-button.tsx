"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icon } from "@/components/icons"

interface ActivityAddButtonProps extends ButtonProps {}

export function ActivityAddButton({
  className,
  variant,
  ...props
}: ActivityAddButtonProps) {
  const router = useRouter()
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
        colorCode: "#FFFFFF",
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
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon name="spinner" className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon name="add" className="mr-2 h-4 w-4" />
      )}
      New activity
    </button>
  )
}
