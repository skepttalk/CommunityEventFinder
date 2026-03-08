import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMyEvents } from "@/services/event.service"
import CalendarGrid from "@/components/calendar/CalendarGrid"

export default function CalendarView(){

  const [currentDate,setCurrentDate] = useState(new Date())

  const {data:events=[]} = useQuery({
    queryKey:["calendarEvents"],
    queryFn:getMyEvents
  })

  const month = currentDate.toLocaleString("default",{month:"long"})
  const year = currentDate.getFullYear()

  const prevMonth=()=>{
    const d=new Date(currentDate)
    d.setMonth(d.getMonth()-1)
    setCurrentDate(d)
  }

  const nextMonth=()=>{
    const d=new Date(currentDate)
    d.setMonth(d.getMonth()+1)
    setCurrentDate(d)
  }

  return(

    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          {month} {year}
        </h1>

        <div className="flex gap-3">

          <button
            onClick={prevMonth}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50"
          >
            ◀
          </button>

          <button
            onClick={nextMonth}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50"
          >
            ▶
          </button>

        </div>

      </div>

      <CalendarGrid
        currentDate={currentDate}
        events={events}
      />

    </div>

  )
}