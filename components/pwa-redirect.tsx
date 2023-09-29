"use client"

import * as React from "react"
import { redirect } from "next/navigation"

export function PWARedirect() {
  // Redirect to signin page if PWA
  React.useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      redirect("/signin")
    }
  }, [])

  return null
}
