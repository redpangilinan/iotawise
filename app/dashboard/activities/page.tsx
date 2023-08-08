import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Activities",
  description: "Manage account activities/hobbies.",
}

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  return (
    <main className="flex items-center justify-center p-12 text-3xl">
      Work in progress
    </main>
  )
}
