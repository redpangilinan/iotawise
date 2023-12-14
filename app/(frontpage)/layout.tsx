import { getCurrentUser } from "@/lib/session"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

interface FrontPageLayoutProps {
  children: React.ReactNode
}

export default async function FrontPageLayout({
  children,
}: FrontPageLayoutProps) {
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
      {children}
      <Footer />
    </>
  )
}
