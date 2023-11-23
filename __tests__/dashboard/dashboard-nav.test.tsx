import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { dashboardLinks } from "@/config/links"
import { DashboardNav } from "@/components/pages/dashboard/dashboard-nav"

describe("DashboardNav", () => {
  test("renders DashboardNav component with items", () => {
    render(<DashboardNav items={dashboardLinks.data} />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Activities")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()

    userEvent.click(screen.getByText("Dashboard"))
  })

  test("renders DashboardNav component with no items", () => {
    render(<DashboardNav items={[]} />)

    expect(screen.queryByText("Dashboard")).toBeNull()
    expect(screen.queryByText("Activities")).toBeNull()
    expect(screen.queryByText("Settings")).toBeNull()
  })
})
