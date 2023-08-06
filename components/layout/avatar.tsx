import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NavUser } from "@/types/auth"

export default function Avatar({ user }: NavUser) {
  return (
    <div className="flex items-center">
      {user ? (
        <span>{user.name}</span>
      ) : (
        <Link
          href="/signin"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Sign in
        </Link>
      )}
    </div>
  )
}
