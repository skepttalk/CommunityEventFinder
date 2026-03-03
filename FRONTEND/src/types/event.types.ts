export interface Event {
  _id: string
  title: string
  description: string
  date: string
  status: "open" | "closed"
  location: {
    city: string
    state: string
  }
}