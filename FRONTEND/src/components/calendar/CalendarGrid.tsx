import { Link } from "react-router-dom"

export default function CalendarGrid({currentDate,events}:any){

  const year=currentDate.getFullYear()
  const month=currentDate.getMonth()

  const firstDay=new Date(year,month,1).getDay()
  const daysInMonth=new Date(year,month+1,0).getDate()

  const days=[]

  for(let i=0;i<firstDay;i++){
    days.push(null)
  }

  for(let i=1;i<=daysInMonth;i++){
    days.push(i)
  }

  const getEvents=(day:number)=>{
    return events.filter((e:any)=>{
      const d=new Date(e.date)
      return (
        d.getDate()===day &&
        d.getMonth()===month &&
        d.getFullYear()===year
      )
    })
  }

  return(

    <div className="grid grid-cols-7 border rounded-xl overflow-hidden">

      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
        <div
          key={d}
          className="text-center font-semibold p-3 border-b bg-gray-50"
        >
          {d}
        </div>
      ))}

      {days.map((day,index)=>{

        const dayEvents=day?getEvents(day):[]

        return(

          <div
            key={index}
            className="min-h-[120px] border p-2 hover:bg-gray-50"
          >

            {day && (
              <div className="text-sm font-semibold mb-2">
                {day}
              </div>
            )}

            <div className="flex flex-col gap-1">

              {dayEvents.map((event:any)=>(
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded truncate"
                >
                  {event.title}
                </Link>
              ))}

            </div>

          </div>

        )

      })}

    </div>

  )
}