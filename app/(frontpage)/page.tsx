import { PWARedirect } from "@/components/pwa-redirect"
import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Overview from "@/components/pages/overview"
import OpenSource from "@/components/pages/opensource"

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Overview />
      <OpenSource />
      <PWARedirect />
    </>
  )
}
