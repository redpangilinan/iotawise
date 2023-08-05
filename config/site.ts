import { SiteConfig, ContactConfig } from "@/types"
import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Iotawise",
  author: "redpangilinan",
  description:
    "Track daily habits and monitor your progress with little effort.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "Habits",
    "Activity",
    "Track",
    "Monitor",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://redpangilinan.live",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}

export const contactConfig: ContactConfig = {
  email: "janreynald.pangilinan@gmail.com",
}
