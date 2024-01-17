import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function dateRangeParams(searchParams: { from: string; to: string }) {
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

    return dateRange
  }

  return {
    from: new Date(searchParams.from),
    to: new Date(searchParams.to),
  }
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
