"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

interface PWAWrapperProps {
  children: React.ReactNode
}

export function PWAWrapper({ children }: PWAWrapperProps) {
  const router = useRouter()

  // Redirect to sign in if PWA
  React.useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      router.push("/signin")
      router.refresh()
    }
  }, [router])

  return <main>{children}</main>
}
