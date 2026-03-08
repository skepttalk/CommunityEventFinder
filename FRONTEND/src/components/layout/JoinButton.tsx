import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { joinEvent } from "@/services/event.service"

interface JoinButtonProps {
  eventId: string
}

export default function JoinButton({ eventId }: JoinButtonProps) {

  const queryClient = useQueryClient()

  const joinMutation = useMutation({
    mutationFn: joinEvent,
    onSuccess: () => {
      alert("Successfully joined event")

      queryClient.invalidateQueries({
        queryKey: ["event", eventId],
      })
    },
    onError: (err:any) => {
      alert(err?.response?.data?.message || "Unable to join event")
    }
  })

  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700"
      onClick={() => joinMutation.mutate(eventId)}
      disabled={joinMutation.isPending}
    >
      {joinMutation.isPending ? "Joining..." : "Join Event"}
    </Button>
  )
}