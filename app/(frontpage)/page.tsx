import { PWAWrapper } from "@/components/pwa-wrapper"
import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Overview from "@/components/pages/overview"
import OpenSource from "@/components/pages/opensource"

export default function Home() {
  return (
    <PWAWrapper>
      <Hero />
      <FeatureCards />
      <Overview />
      <OpenSource />
    </PWAWrapper>
  )
}
