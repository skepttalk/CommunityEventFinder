import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyEvents() {
  const { data } = useQuery({
    queryKey: ["myEvents"],
    queryFn: async () => {
      const res = await api.get("/events/my-events");
      return res.data.data;
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Events</h1>

      {data?.map((event: any) => (
        <div
          key={event._id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{event.title}</h3>

            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Link to={`/edit-event/${event._id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
