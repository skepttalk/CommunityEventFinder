import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import { CalendarDays, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturesSection() {
  const features = [
    {
      icon: CalendarDays,
      title: "Discover Events",
      description:
        "Browse a curated list of events filtered by city, date, and type. Never miss a gathering that matters to you.",
    },
    {
      icon: MapPin,
      title: "Find Nearby",
      description:
        "View event locations on an interactive map. Get directions and see exactly where your next meetup takes place.",
    },
    {
      icon: Users,
      title: "RSVP Instantly",
      description:
        "Join events with a single click. Track your registrations and get updates as event details change.",
    },
  ]

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Stay Connected
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you are looking to attend or organize, EventFinder has the tools to make it happen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}