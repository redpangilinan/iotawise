import * as React from "react"

import { cn } from "@/lib/utils"

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
