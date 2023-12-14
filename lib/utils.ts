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
      dateRange.from.toISOString()
      dateRange.to.toISOString()
    }

    return dateRange
  }
  if (searchParams.utc) {
    return {
      from: new Date(searchParams.from).toISOString(),
      to: new Date(searchParams.to).toISOString(),
    }
  }

  return {
    from: new Date(searchParams.from),
    to: new Date(searchParams.to),
  }
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
