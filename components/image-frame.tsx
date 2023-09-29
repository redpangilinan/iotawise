import React from "react"

interface ImageFrameProps {
  children: React.ReactNode
}

export function ImageFrame({ children }: ImageFrameProps) {
  return (
    <div className="rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:bg-slate-100/5 dark:ring-slate-100/10 lg:rounded-2xl lg:p-4">
      {children}
    </div>
  )
}
