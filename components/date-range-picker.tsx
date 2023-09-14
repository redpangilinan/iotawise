"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { addDays, format } from "date-fns"
import { Icons } from "./icons"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function urlDate(input: string): string {
  const date = new Date(input)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const formattedMonth = month < 10 ? `0${month}` : `${month}`
  const formattedDay = day < 10 ? `0${day}` : `${day}`

  return `${year}-${formattedMonth}-${formattedDay}`
}

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -365),
    to: new Date(),
  })

  function handleButtonClick() {
    if (!date || date === undefined) {
      return null
    }

    if (date.to === undefined || date.from === undefined) {
      return null
    }

    router.push(
      `?from=${urlDate(date.from.toISOString())}&to=${urlDate(
        date.to.toISOString()
      )}`
    )
    router.refresh()
  }

  return (
    <div className={cn("flex gap-1", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal md:w-[16.25rem]",
              !date && "text-muted-foreground"
            )}
          >
            <Icons.calendar className="mr-2 h-4 w-4" />
            <span className="truncate">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="flex flex-row-reverse px-2 pb-2">
            <Button
              variant="outline"
              onClick={handleButtonClick}
              className="w-full"
            >
              <Icons.check className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
