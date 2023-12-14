import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function dateRangeParams(searchParams: {
  from: string
  to: string
  utc?: boolean
}) {
  if (
    !searchParams.from ||
    isNaN(Date.parse(searchParams.from)) ||
    !searchParams.to ||
    isNaN(Date.parse(searchParams.to))
  ) {
    const dateRange = {
      from: new Date(),
      to: new Date(),
    }

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    dateRange.from = oneYearAgo

    if (searchParams.utc) {
      dateRange.from = new Date(dateRange.from.toISOString())
      dateRange.to = new Date(dateRange.to.toISOString())
    }

    return dateRange
  }

  const from = new Date(searchParams.from)
  const to = new Date(searchParams.to)

  if (searchParams.utc) {
    return {
      from: new Date(from.toISOString()),
      to: new Date(to.toISOString()),
    }
  }

  return {
    from,
    to,
  }
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
