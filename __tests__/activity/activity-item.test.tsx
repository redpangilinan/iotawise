import { render, screen } from "@testing-library/react"

import { ActivityItem } from "@/components/activity/activity-item"

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe("ActivityItem", () => {
  const activity = {
    id: "1",
    name: "Test Activity",
    description: "This is a test activity",
    colorCode: "#FF0000",
    createdAt: new Date("2023-01-01T00:00:00"),
  }

  it("renders activity name and description", () => {
    render(<ActivityItem activity={activity} />)

    const nameElement = screen.getByText(activity.name)
    const descriptionElement = screen.getByText(activity.description)

    expect(nameElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })

  it("renders activity color code", () => {
    render(<ActivityItem activity={activity} />)

    const colorCodeElement = screen.getByTestId("color-code")

    expect(colorCodeElement).toHaveStyle(
      `background-color: ${activity.colorCode}`
    )
  })

  it("renders activity creation date", () => {
    render(<ActivityItem activity={activity} />)

    const createdAtElement = screen.getByText("Jan 1, 2023")

    expect(createdAtElement).toBeInTheDocument()
  })

  it("links to the activity details page", () => {
    render(<ActivityItem activity={activity} />)

    const linkElement = screen.getByRole("link")

    expect(linkElement).toHaveAttribute("href", "/dashboard/activities/1")
  })
})
