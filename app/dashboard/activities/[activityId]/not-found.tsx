import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Icons } from "@/components/icons"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center md:p-4 lg:p-8">
      <EmptyPlaceholder className="mx-auto max-w-[800px]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icons.warning className="h-10 w-10" />
        </div>
        <EmptyPlaceholder.Title>Not Found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This activity cound not be found. Please try again.
        </EmptyPlaceholder.Description>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Go to Dashboard
        </Link>
      </EmptyPlaceholder>
    </div>
  )
}
