import { Button } from "@/components/ui"
import { ArrowRight, CalendarDays } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" />
            Discover Local Events
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Events That Bring
            <br className="hidden sm:block" />
            Your Community Together
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Discover meetups, workshops, and conferences happening near you.
            Join as a participant or create and manage events as an organizer.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link to="/events">
              <Button size="lg" className="gap-2 px-8">
                Browse Events
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="outline" size="lg" className="px-8">
                Become an Organizer
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}