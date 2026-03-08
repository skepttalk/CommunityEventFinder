import { useQuery } from "@tanstack/react-query";
import { getMyEvents } from "@/services/event.service";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function MyActivity() {
  const { user } = useAuth();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["myActivity"],
    queryFn: getMyEvents,
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">My Activity</h1>

        <p className="text-muted-foreground">
          {user?.role === "organizer"
            ? "Track your events and manage attendees"
            : "View events you joined and their status"}
        </p>
      </div>

      {events.length === 0 && (
        <div className="text-center text-muted-foreground py-16 border rounded-xl">
          No activity found
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {events.map((event: any) => (
          <div
            key={event._id}
            className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >

            <div className="space-y-3">

              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  {event.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toDateString()}
                </p>

                <p className="text-sm text-muted-foreground">
                  {event.location?.city}
                </p>
              </div>

              {user?.role === "organizer" && (
                <div className="flex gap-4 text-sm pt-2">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    Participants: {event.participants?.length || 0}
                  </div>

                  <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                    Pending: {event.pendingParticipants?.length || 0}
                  </div>
                </div>
              )}

              {user?.role === "participant" && (
                <div className="pt-2">

                  {event.participants?.some(
                    (p: any) => p._id === user._id
                  ) && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Approved
                    </span>
                  )}

                  {event.pendingParticipants?.some(
                    (p: any) => p._id === user._id
                  ) && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Pending Approval
                    </span>
                  )}

                </div>
              )}

            </div>

            <div className="flex gap-3 pt-6">

              <Link to={`/events/${event._id}`} className="flex-1">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-md transition">
                  View Event
                </button>
              </Link>

              {user?.role === "organizer" && (
                <Link to={`/edit-event/${event._id}`} className="flex-1">
                  <button className="w-full border hover:bg-gray-50 text-sm py-2 rounded-md transition">
                    Manage
                  </button>
                </Link>
              )}

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}