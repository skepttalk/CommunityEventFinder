import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["myEvents"],
    queryFn: async () => {
      const res = await api.get("/events/my-events");
      return res.data.data;
    },
  });

  const totalEvents = data?.length || 0;
  const openEvents = data?.filter((e: any) => e.status === "open").length || 0;
  const closedEvents =
    data?.filter((e: any) => e.status === "closed").length || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>

          <p className="text-muted-foreground">
            Manage your events and track performance
          </p>
        </div>

        <Link to="/create-event">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            + Create Event
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Events" value={String(totalEvents)} />
        <StatCard title="Open Events" value={String(openEvents)} />
        <StatCard title="Closed Events" value={String(closedEvents)} />
      </div>

      <div className="border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Events</h2>

          <Link to="/my-events" className="text-indigo-600">
            View All
          </Link>
        </div>

        {data?.length === 0 && (
          <p className="text-muted-foreground">No events created yet.</p>
        )}

        {data?.map((event: any) => (
          <div
            key={event._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toDateString()}
              </p>
            </div>

            <Link to={`/edit-event/${event._id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
