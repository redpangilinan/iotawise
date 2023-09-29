import { Icons } from "@/components/icons"

export default function HomeLoading() {
  return (
    <main className="flex justify-center p-8">
      <Icons.spinner className="animate-spin text-4xl" />
    </main>
  )
}
