import { useQuery } from "@tanstack/react-query"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import { useNavigate } from "react-router-dom"

import { getMyEvents } from "@/services/event.service"

import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export default function CalendarView() {

  const navigate = useNavigate()

  const { data = [] } = useQuery({
    queryKey: ["myEventsCalendar"],
    queryFn: getMyEvents
  })

  const events = data.map((event:any)=>({
    id: event._id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date)
  }))

  const handleSelectEvent = (event:any)=>{
    navigate(`/events/${event.id}`)
  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Event Calendar
      </h1>

      <div className="bg-white p-4 rounded-xl shadow">

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={["month","week","day"]}
          popup
          onSelectEvent={handleSelectEvent}
        />

      </div>

    </div>
  )
}