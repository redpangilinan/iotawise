import Link from "next/link"
import { User } from "next-auth"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { UserAccountNav } from "./user-account-nav"

interface UserNavDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserNavDisplay({ user }: UserNavDisplayProps) {
  if (user.email === null || user.email === undefined) {
    return (
      <Link
        href="/signin"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        Sign in
      </Link>
    )
  }

  return (
    <UserAccountNav
      user={{
        name: user.name,
        image: user.image,
        email: user.email,
      }}
    />
  )
}
