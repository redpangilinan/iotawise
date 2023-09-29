"use client"

import * as React from "react"
import { redirect } from "next/navigation"

interface PWAWrapperProps {
  children: React.ReactNode
}

export function PWAWrapper({ children }: PWAWrapperProps) {
  // Redirect to sign in if PWA
  React.useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      redirect("/signin")
    }
  }, [])

  return <main>{children}</main>
}
