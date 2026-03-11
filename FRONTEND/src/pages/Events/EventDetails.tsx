import { useMutation, useQuery } from "@tanstack/react-query";
import { joinEvent, getEventById } from "@/services/event.service";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import EventDetailsView from "@/components/event/EventDetailsView";

export default function EventDetails() {
  const { id } = useParams();

  const {
    data: event,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id as string),
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const joinMutation = useMutation({
    mutationFn: joinEvent,
    onSuccess: () => {
      alert("Join request sent");
      refetch();
    },
    onError: (err: any) => {
      alert(
        err?.response?.data?.message ||
          "Login required to send a join request.",
      );
    },
  });

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (!event) return <div className="p-6 text-center">Event not found</div>;

  const participants = event?.participants?.length || 0;
  const max = event?.maxParticipants || 50;

  const isClosed = event.status === "closed";
  const isParticipant =
    event.participants?.some((p: any) => p._id === user?._id) || false;

  const isPending =
    event.pendingParticipants?.some((p: any) => p._id === user?._id) || false;

  const isFull = participants >= max;

  const buttonText = isParticipant
    ? "Already Joined"
    : isPending
      ? "Pending Approval"
      : isClosed
        ? "Event Closed"
        : isFull
          ? "Event Full"
          : "Join Event";

  const disabled = isParticipant || isPending || isClosed || isFull;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link
        to="/events"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Events
      </Link>

      <EventDetailsView
        event={event}
        joinButton={
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
            disabled={disabled}
            onClick={() => joinMutation.mutate(event._id)}
          >
            {joinMutation.isPending ? "Joining..." : buttonText}
          </button>
        }
      />
    </motion.div>
  );
}
