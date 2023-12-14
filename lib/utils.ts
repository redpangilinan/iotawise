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
      dateRange.from.setUTCHours(0, 0, 0, 0)
      dateRange.to.setUTCHours(23, 59, 59, 999)
    }

    return dateRange
  }

  const fromUTC = new Date(searchParams.from)
  const toUTC = new Date(searchParams.to)

  if (searchParams.utc) {
    fromUTC.setUTCHours(0, 0, 0, 0)
    toUTC.setUTCHours(23, 59, 59, 999)
  }

  return {
    from: fromUTC,
    to: toUTC,
  }
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
