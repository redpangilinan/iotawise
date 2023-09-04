import { Shell } from "@/components/layout/shell"
import { Icons } from "@/components/icons"

export default async function DashboardLoading() {
  return (
    <Shell>
      <div className="flex justify-center p-8">
        <Icons.spinner className="animate-spin text-4xl" />
      </div>
    </Shell>
  )
}
