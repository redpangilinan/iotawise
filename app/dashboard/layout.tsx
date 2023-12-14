import { dashboardLinks } from "@/config/links"
import { getCurrentUser } from "@/lib/session"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { DashboardNav } from "@/components/pages/dashboard/dashboard-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
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
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
