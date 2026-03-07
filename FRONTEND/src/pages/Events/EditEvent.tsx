import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

import api from "@/services/api";
import {
  closeEvent,
  deleteEvent,
  getEventById,
  approveParticipant,
} from "@/services/event.service";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const { data: event, refetch } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");

      setDate(event.date?.slice(0, 10) || "");
      setTime(event.date?.slice(11, 16) || "");

      setCity(event.location?.city || "");
      setState(event.location?.state || "");
      setStreet(event.location?.street || "");
      setAddress(event.location?.address || "");
      setPincode(event.location?.pincode || "");

      setMaxParticipants(event.maxParticipants?.toString() || "");
    }
  }, [event]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return api.put(`/events/${id}`, data);
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const closeMutation = useMutation({
    mutationFn: () => closeEvent(id as string),
    onSuccess: () => navigate("/dashboard"),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(id as string),
    onSuccess: () => navigate("/dashboard"),
  });

  const approveMutation = useMutation({
    mutationFn: ({ eventId, userId }: any) =>
      approveParticipant(eventId, userId),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateTime = new Date(`${date}T${time}`);

    updateMutation.mutate({
      title,
      description,
      date: dateTime.toISOString(),

      maxParticipants: Number(maxParticipants),

      location: {
        city,
        state,
        street,
        address,
        pincode: Number(pincode),
      },
    });
  };

  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?",
    );
    if (confirmDelete) {
      deleteMutation.mutate();
    }
  };

  const pending = event?.pendingParticipants || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 space-y-8"
    >
      <Card className="relative shadow-lg">
        <button
          onClick={handleDelete}
          className="absolute top-5 right-5 p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
        >
          <Trash2 size={18} className="text-red-600" />
        </button>

        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Event</h1>
            <p className="text-muted-foreground">Update your event details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Event Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div>
                <Label>State</Label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Street</Label>
                <Input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Pincode</Label>
                <Input
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>

              <div>
                <Label>Max Participants</Label>
                <Input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {updateMutation.isPending ? "Updating..." : "Update Event"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => closeMutation.mutate()}
              >
                Close Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-xl font-semibold">Pending Join Requests</h2>

          {pending.length === 0 && (
            <p className="text-muted-foreground text-sm">No pending requests</p>
          )}

          <div className="space-y-3">
            {pending.map((user: any) => (
              <div
                key={user._id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Button
                  onClick={() =>
                    approveMutation.mutate({
                      eventId: event._id,
                      userId: user._id,
                    })
                  }
                >
                  Approve
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
