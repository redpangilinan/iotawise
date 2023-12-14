import { render, screen } from "@testing-library/react"

import { ActivityOperations } from "@/components/activity/activity-operations"

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

// TODO: more test cases

describe("ActivityOperations component", () => {
  const mockActivity = {
    id: "1",
  }

  it("renders without crashing", () => {
    render(<ActivityOperations activity={mockActivity} />)
    expect(screen.getByText("Open")).toBeInTheDocument()
  })
})
