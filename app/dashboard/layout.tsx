import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { getCurrentUser } from "@/lib/session"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  )
}
