import { CalendarDays, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventDetailsView({ event, joinButton }: any) {
  const participants = event?.participants?.length || 0;
  const max = event?.maxParticipants || 50;
  const spotsLeft = max - participants;
  const percent = Math.min((participants / max) * 100, 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <Badge
              variant={event?.status === "open" ? "default" : "secondary"}
              className="mb-3 capitalize"
            >
              {event?.status}
            </Badge>

            <h1 className="text-3xl font-bold">{event?.title}</h1>

            <p className="text-muted-foreground mt-2">
              Organized by {event?.createdBy?.name || "Organizer"}
            </p>

            <h3 className="mt-6 font-semibold text-lg">About This Event</h3>

            <p className="text-muted-foreground mt-2 leading-relaxed">
              {event?.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Location</h3>

            <iframe
              title="map"
              className="w-full h-64 rounded-md"
              src={`https://maps.google.com/maps?q=${event?.location?.street},${event?.location?.city}&z=15&output=embed`}
            />

            <p className="text-sm text-muted-foreground mt-2">
              {event?.location?.street}, {event?.location?.city}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={16} />
              {event?.date
                ? new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Event Date"}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              {event?.location?.city}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />
              {participants}/{max} attending
            </div>

            <div className="text-sm text-muted-foreground">
              {spotsLeft} spots remaining
            </div>

            <div className="w-full bg-muted h-2 rounded-md overflow-hidden">
              <div
                className="bg-primary h-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            {joinButton}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
