import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

import { BiChevronLeft } from "react-icons/bi"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
}

export default function LoginPage() {
  return (
    <main className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <BiChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up with your google account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
