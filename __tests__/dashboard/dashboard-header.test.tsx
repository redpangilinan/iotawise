import { render } from "@testing-library/react"

import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

describe("DashboardHeader", () => {
  let heading: string
  let text: string

  // Mock data
  beforeEach(() => {
    heading = "Dashboard"
    text = "Shows your activities"
  })

  test("renders heading and text correctly", () => {
    const { getByText } = render(
      <DashboardHeader heading={heading} text={text} />
    )

    expect(getByText(heading)).toBeInTheDocument()
    expect(getByText(text)).toBeInTheDocument()
  })

  test("Renders heading without text", () => {
    const { getByText, queryByText } = render(
      <DashboardHeader heading={heading} />
    )

    expect(getByText(heading)).toBeInTheDocument()
    expect(queryByText("Test Text")).toBeNull()
  })

  test("renders children correctly", () => {
    const { getByText } = render(
      <DashboardHeader heading={heading} text={text}>
        <div>Test children</div>
      </DashboardHeader>
    )

    expect(getByText(heading)).toBeInTheDocument()
    expect(getByText(text)).toBeInTheDocument()
    expect(getByText("Test children")).toBeInTheDocument()
  })
})
