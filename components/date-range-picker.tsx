"use client"

import * as React from "react"
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
import { useToast } from "@/components/ui/use-toast"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { toast } = useToast()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -365),
    to: new Date(),
  })

  return (
    <div className={cn("flex gap-1", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[16.25rem] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Icons.calendar className="mr-2 h-4 w-4" />
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
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Work in progress",
            description: "Date range filter is still being worked on.",
          })
        }}
      >
        <Icons.check className="h-4 w-4" />
      </Button>
    </div>
  )
}
