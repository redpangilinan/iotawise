import { getCurrentUser } from "@/lib/session"
import { dashboardLinks } from "@/config/links"

import { DashboardNav } from "@/components/pages/dashboard/dashboard-nav"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  return (
    <>
      <Navbar
        user={{
          name: user?.name,
          image: user?.image,
          email: user?.email,
        }}
      />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardLinks.data} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
