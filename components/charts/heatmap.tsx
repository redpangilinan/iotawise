"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import CalendarHeatmap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap"

import "react-calendar-heatmap/dist/styles.css"

import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface Value {
  id: string
  date: string
  count: number
}

interface HeatmapProps {
  data: {
    activity: {
      id: string
      name: string
    }
    id: string
    date: Date
    count: number
  }[]
  params: { activityId: string }
}

async function deleteActivity(activityId: string, logsId: string) {
  const response = await fetch(`/api/activities/${activityId}/logs/${logsId}`, {
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
      title: "Item has been deleted.",
      description: "Your activity has been deleted successfully.",
      variant: "default",
    })
  }

  return true
}

export function Heatmap({ data, params }: HeatmapProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [selectedLog, setSelectedLog] = React.useState<Value | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  const handleDelete = async () => {
    if (selectedLog) {
      setIsDeleteLoading(true)
      const deleted = await deleteActivity(params.activityId, selectedLog.id)

      if (deleted) {
        setIsDeleteLoading(false)
        setShowDeleteAlert(false)
        setSelectedLog(null)
        router.refresh()
      }
    }
  }

  const getColorClass = (count: number) => {
    if (count < 1) {
      return "fill-zinc-200 dark:fill-zinc-800"
    } else if (count < 2) {
      return "fill-green-300 dark:fill-green-900"
    } else if (count < 3) {
      return "fill-green-400 dark:fill-green-800"
    } else if (count < 5) {
      return "fill-green-500 dark:fill-green-700"
    } else if (count < 7) {
      return "fill-green-600 dark:fill-green-600"
    } else if (count < 9) {
      return "fill-green-700 dark:fill-green-500"
    } else if (count < 11) {
      return "fill-green-800 dark:fill-green-400"
    } else {
      return "fill-green-900 dark:fill-green-300"
    }
  }

  const getTitle = (value: Value) => {
    if (value && value.count) {
      return `${value.count} ${
        value.count === 1 ? "log" : "logs"
      } on ${formatDate(value.date)}`
    }
    return "No logs"
  }

  const currentDate = new Date()
  const startDate = new Date(currentDate)
  startDate.setFullYear(currentDate.getFullYear() - 1)

  return (
    <Card className="w-full overflow-x-auto p-4 md:p-8">
      <div className="min-w-[765px]">
        <CalendarHeatmap
          startDate={startDate}
          endDate={currentDate}
          values={data.map((value) => ({
            ...value,
            date: value.date.toISOString(),
          }))}
          classForValue={(value) => getColorClass(value ? value.count : 0)}
          titleForValue={(value) => getTitle(value as Value)}
          onClick={(value: ReactCalendarHeatmapValue<string> | undefined) => {
            if (value) {
              setSelectedLog(value as Value)
              setSelectedDate(new Date(value.date))
              setShowDeleteAlert(true)
            }
          }}
        />
        <Credenza open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>
                Delete logs from {selectedDate ? formatDate(selectedDate) : ""}?
              </CredenzaTitle>
              <CredenzaDescription>
                This action cannot be undone.
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaFooter className="flex flex-col-reverse">
              <CredenzaClose asChild>
                <Button variant="outline">Cancel</Button>
              </CredenzaClose>
              <Button
                onClick={handleDelete}
                disabled={isDeleteLoading}
                className="bg-red-600 focus:ring-red-600"
              >
                {isDeleteLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" />
                )}
                <span>Delete</span>
              </Button>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </div>
    </Card>
  )
}
