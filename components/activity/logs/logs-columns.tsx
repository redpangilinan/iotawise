"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { LogsDeleteButton } from "./logs-delete-button"

export type LogsType = {
  id: string
  date: Date
  count: number
  activity: {
    id: string
    name: string
  }
}

export const logColumns: ColumnDef<LogsType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => {
      const date = new Date(row.getValue() as string)
      const formattedDate = Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZoneName: "short",
      }).format(date)
      return formattedDate
    },
  },
  {
    accessorKey: "activity.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Count
          <Icon name="sort" className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const logs = row.original
      return <LogsDeleteButton logs={logs} />
    },
  },
]
