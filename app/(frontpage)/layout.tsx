import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { getCurrentUser } from "@/lib/session"

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
