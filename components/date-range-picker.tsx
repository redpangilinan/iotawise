"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn, dateRangeParams } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./icons"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const from = searchParams.get("from")
  const to = searchParams.get("to")

  const dateRange =
    from && to
      ? dateRangeParams({
          from,
          to,
        })
      : undefined

  const [date, setDate] = React.useState<DateRange | undefined>(dateRange)

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
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="grid grid-cols-1 gap-2 px-2 pb-2 md:grid-cols-2">
            <PopoverClose
              onClick={() => {
                if (!date || date === undefined) {
                  return null
                }

                if (date.to === undefined || date.from === undefined) {
                  return null
                }

                const urlDate = (dateString: string) => {
                  const date = new Date(dateString)
                  const utcString = date.toISOString()

                  return encodeURIComponent(utcString)
                }

                router.push(
                  `?from=${urlDate(date.from.toISOString())}&to=${urlDate(
                    date.to.toISOString()
                  )}`
                )
                router.refresh()
              }}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <Icons.check className="mr-2 h-4 w-4" />
              Confirm Filter
            </PopoverClose>
            <PopoverClose
              onClick={() => {
                router.push(`${pathname}`)
                router.refresh()
                setDate(undefined)
              }}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <Icons.close className="mr-2 h-4 w-4" />
              Clear Filter
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
