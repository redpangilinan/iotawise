import { render, RenderResult } from "@testing-library/react"

import { StatsCards } from "@/components/activity/stats/stats-cards"

describe("StatsCards", () => {
  let data: {
    streak: {
      currentStreak: number
      longestStreak: number
    }
    totalLogs: number
    dailyAverage: number
  }
  let searchParams: {
    from: string
    to: string
  }
  let getByText: RenderResult["getByText"]

  // Mock data
  beforeEach(() => {
    data = {
      streak: {
        currentStreak: 5,
        longestStreak: 10,
      },
      totalLogs: 100,
      dailyAverage: 7,
    }

    searchParams = {
      from: "2022-01-01",
      to: "2022-12-31",
    }
    ;({ getByText } = render(
      <StatsCards data={data} searchParams={searchParams} />
    ))
  })

  test("Render streaks properly", () => {
    expect(getByText("Current Streak")).toBeInTheDocument()
    expect(getByText("Longest Streak")).toBeInTheDocument()
    expect(getByText("5")).toBeInTheDocument()
    expect(getByText("10")).toBeInTheDocument()
  })

  test("Render total logs properly", () => {
    expect(getByText("Total Logs")).toBeInTheDocument()
    expect(getByText("100")).toBeInTheDocument()
  })

  test("Render daily average properly", () => {
    expect(getByText("Daily Average")).toBeInTheDocument()
    expect(getByText("7")).toBeInTheDocument()
  })
})
