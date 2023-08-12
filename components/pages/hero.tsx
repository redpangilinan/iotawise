import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HeroHeader() {
  return (
    <section className="lg:items-left container flex flex-col-reverse items-center gap-4 pb-12 pt-4 text-center lg:flex-row lg:gap-8 lg:py-20 ">
      <div className="flex flex-1 flex-col items-center gap-4 lg:items-start lg:gap-6 lg:text-left">
        <h1 className="text-4xl font-bold lg:text-6xl">Build your habits.</h1>
        <h2 className="text-lg font-light text-muted-foreground lg:text-2xl">
          Track daily habits and monitor your progress and activity streaks with
          little effort.
        </h2>
        <Link
          href="/dashboard"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Get started
        </Link>
      </div>
      <div className="flex flex-1 justify-center lg:justify-end">
        <Image
          src="/images/hero-img.png"
          width="600"
          height="600"
          priority={true}
          alt="Header image"
        />
      </div>
    </section>
  )
}
