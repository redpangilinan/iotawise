import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import HeadingText from "@/components/heading-text"

export default function Overview() {
  return (
    <section className="container py-12 lg:py-20" id="overview">
      <div className="flex flex-col gap-8 text-center">
        <HeadingText subtext="Get started with the app">
          Discover what you can do
        </HeadingText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Add your activities</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Image
                src="/images/activities.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Track activities by logging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/logging.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Monitor all your activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/dashboard.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Statistics for each activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/activity-stats.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                View your log history
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/log-history.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Personalize your activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/personalize.jpg"
                width="600"
                height="400"
                priority={true}
                alt="Showcase image"
                className="rounded border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
