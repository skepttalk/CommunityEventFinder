import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { CalendarDays, MapPin, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { getEventById } from "@/services/event.service"

export default function EventDetails() {
  const { id } = useParams()

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id as string),
  })

  if (isLoading) return <div className="p-6 text-center">Loading...</div>

  const participants = event?.participants?.length || 0
  const max = event?.maxParticipants || 50
  const spotsLeft = max - participants

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <Link
        to="/events"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">


        <div className="lg:col-span-2 space-y-6">

          <Card>
            <CardContent className="p-6">

              <Badge className="mb-2">
                {event.status}
              </Badge>

              <h1 className="text-3xl font-bold">
                {event.title}
              </h1>

              <p className="text-muted-foreground mt-2">
                Organized by {event.createdBy?.name || "Organizer"}
              </p>

              <h3 className="mt-6 font-semibold text-lg">
                About This Event
              </h3>

              <p className="text-muted-foreground mt-2">
                {event.description}
              </p>

            </CardContent>
          </Card>

      

          <Card>
            <CardContent className="p-6">

              <h3 className="font-semibold text-lg mb-4">
                Location
              </h3>

              <iframe
                title="map"
                className="w-full h-64 rounded-md"
                src={`https://maps.google.com/maps?q=${event.location?.city}&z=15&output=embed`}
              />

              <p className="text-sm text-muted-foreground mt-2">
                {event.location?.address}, {event.location?.city}
              </p>

            </CardContent>
          </Card>

        </div>



        <div className="space-y-6">

          <Card>
            <CardContent className="p-6 space-y-4">

              <div className="flex items-center gap-2 text-sm">
                <CalendarDays size={16} />
                {new Date(event.date).toLocaleString()}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                {event.location?.city}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users size={16} />
                {participants}/{max} attending
              </div>

              <div className="text-sm text-muted-foreground">
                {spotsLeft} spots remaining
              </div>

              <Button className="w-full">
                RSVP Now
              </Button>

            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  )
}