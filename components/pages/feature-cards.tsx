import { BsFire, BsLayoutTextWindowReverse } from "react-icons/bs"
import { RxActivityLog } from "react-icons/rx"
import { TbDeviceAnalytics } from "react-icons/tb"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import HeadingText from "@/components/heading-text"

function Cards() {
  return (
    <>
      <Card className="flex flex-grow flex-col justify-between gap-4 p-8 text-left dark:bg-secondary">
        <RxActivityLog className="text-4xl" />
        <CardTitle>Activity Tracking</CardTitle>
        <CardDescription>
          Easily add and track daily habits and activities, creating a
          comprehensive progress log.
        </CardDescription>
      </Card>
      <Card className="flex flex-grow flex-col justify-between gap-4 p-8 text-left dark:bg-secondary">
        <BsFire className="text-4xl" />
        <CardTitle>Streak Monitoring</CardTitle>
        <CardDescription>
          Track streaks for each activity, motivating consistent engagement and
          achieving personal milestones.
        </CardDescription>
      </Card>
      <Card className="flex flex-grow flex-col justify-between gap-4 p-8 text-left dark:bg-secondary">
        <TbDeviceAnalytics className="text-4xl" />
        <CardTitle>Insightful Analytics</CardTitle>
        <CardDescription>
          Get data-driven insights and visualizations to analyze activity trends
          and make informed decisions.
        </CardDescription>
      </Card>
      <Card className="flex flex-grow flex-col justify-between gap-4 p-8 text-left dark:bg-secondary">
        <BsLayoutTextWindowReverse className="text-4xl" />
        <CardTitle>Seamless UI</CardTitle>
        <CardDescription>
          Intuitive and user-friendly interface for easy navigation, activity
          addition, and progress viewing.
        </CardDescription>
      </Card>
    </>
  )
}

export default function FeatureCards() {
  return (
    <section className="bg-secondary" id="features">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        <HeadingText subtext="What does Iotawise offer?">Features</HeadingText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Cards />
        </div>
      </div>
    </section>
  )
}
