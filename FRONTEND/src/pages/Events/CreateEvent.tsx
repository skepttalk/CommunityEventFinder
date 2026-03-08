import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const dateTime = new Date(`${date}T${time}`);

      return api.post("/events", {
        title,
        description,
        date: dateTime.toISOString(),

        maxParticipants: Number(maxParticipants),

        location: {
          city: city || "",
          state: state || "",
          street: street || "",
          address: address || "",
          pincode: Number(pincode) || 0,
        },
      });
    },

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (err: any) => {
      console.log(err.response?.data);
      alert("Event creation failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card>
        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Create New Event</h1>

            <p className="text-muted-foreground">
              Fill in the details below to publish a new event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Event Title</Label>
              <Input
                placeholder="React Conference 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your event..."
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

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Publishing..." : "Publish Event"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
