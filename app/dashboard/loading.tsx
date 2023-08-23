import { Shell } from "@/components/layout/shell"
import { Icon } from "@/components/icons"

export default async function Dashboard() {
  return (
    <Shell>
      <div className="flex justify-center p-8">
        <Icon name="spinner" className="animate-spin text-4xl" />
      </div>
    </Shell>
  )
}
