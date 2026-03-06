import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface JoinButtonProps {
  eventId: string
}

export default function JoinButton({ eventId }: JoinButtonProps) {

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/api/events/${eventId}/join`)
      return res.data
    },
  })

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="w-full"
    >
      {mutation.isPending ? "Joining..." : "Join Event"}
    </Button>
  )
}