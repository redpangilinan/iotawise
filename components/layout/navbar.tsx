"use client"

import Link from "next/link"
import { User } from "next-auth"

import { navLinks } from "@/config/links"
import { siteConfig } from "@/config/site"
import { UserNavDisplay } from "@/components/user/user-nav-display"

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="select-none">
      <nav className="mx-auto flex items-center justify-between px-4 md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="/">
              <h1 className="text-2xl font-bold duration-200">
                {siteConfig.name}
              </h1>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div
            className="absolute left-0 right-0 z-10 m-auto justify-self-center rounded-md border bg-background p-4 md:static md:mt-0 md:border-none md:p-0"
            style={{ width: "100%", maxWidth: "20rem" }}
          >
            <ul className="flex flex-col items-center space-y-4 opacity-60 md:flex-row md:space-x-6 md:space-y-0">
              {navLinks.data.map((item, index) => {
                return (
                  item.href && (
                    <Link
                      key={index}
                      href={item.disabled ? "/" : item.href}
                      className="hover:underline"
                    >
                      {item.title}
                    </Link>
                  )
                )
              })}
            </ul>
          </div>
        </div>
        <UserNavDisplay
          user={{
            name: user?.name,
            image: user?.image,
            email: user?.email,
          }}
        />
      </nav>
    </header>
  )
}
