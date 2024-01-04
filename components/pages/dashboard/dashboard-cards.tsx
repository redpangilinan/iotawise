"use client"

import { SearchParams } from "@/types"

import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface DashboardCardsProps {
  data: {
    streak: {
      currentStreak: number
      longestStreak: number
    }
    totalLogs: number
    mostLoggedActivity: string | undefined
  }
  searchParams: SearchParams
}

function displayDateRange(searchParams: SearchParams) {
  return (
    <>
      {searchParams.from && searchParams.to
        ? `${formatDate(
            new Date(searchParams.from).toISOString()
          )} - ${formatDate(new Date(searchParams.to).toISOString())}`
        : "Last year"}
    </>
  )
}

export function DashboardCards({ data, searchParams }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Icons.fire className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.streak.currentStreak}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
          <Icons.fire className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.streak.longestStreak}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
          <Icons.history className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalLogs}</div>
          <p className="text-xs text-muted-foreground">
            {displayDateRange(searchParams)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Most Logged Activity
          </CardTitle>
          <Icons.activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-bold">
            {data.mostLoggedActivity}
          </div>
          <p className="text-xs text-muted-foreground">
            {displayDateRange(searchParams)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
