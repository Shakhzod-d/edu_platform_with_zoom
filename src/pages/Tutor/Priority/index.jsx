import { useContext, useEffect, useState } from 'react'
import { eventFormatLocalTime, eventTimeCalendarFormat } from '@/libs/utils/format'
import { ModalContext } from '@/context/index.jsx'
import { TutorDisplay, TutorQustion, Wrapper } from '@/UI'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { PriorityModal } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { getMeUser } from '@/libs/slices/profileSlice'
import { getPriorityHours } from '@/libs/slices/eventSlice'
import { getMyEvents } from '@/libs/slices/eventSlice'

export default function Priority() {
  const { show, close } = useContext(ModalContext)
  const [time, setTime] = useState(null)
  const { user } = useSelector(getMeUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPriorityHours(user?.id))
  }, [])

  const { events } = useSelector(getMyEvents)

  console.log(moment(events[0]?.dateFrom).format('MM-DD-YYYY mm:hh'))

  const event = events?.map((el) => {
    return {
      id: el.id,
      start: new Date(el?.dateFrom),
      end: new Date(el?.dateTo),
      title: el.teacher.firstname,
    }
  })

  const handleEventClick = (event) => {
    console.log(event)
    const { start, end } = event
    const startDate = eventFormatLocalTime(start)
    const endDate = eventFormatLocalTime(end)
    const date = {
      start: startDate,
      end: endDate,
    }
    setTime(date)
    show()
  }

  const eventStyleGetter = () => {
    const backgroundColor = '#58db2b'
    const borderColor = '#58db2b'
    const style = {
      backgroundColor,
      borderColor,
    }
    return {
      style,
    }
  }

  const selectEvent = (event) => {
    console.log(event)
  }

  return (
    <div className="flex-start gap-x-5">
      <div className="w-1/3 ">
        <TutorQustion />
        <TutorDisplay />
      </div>

      <Wrapper size="small" className="w-2/3">
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          step={30}
          // timeslots={2}
          defaultView="week"
          eventPropGetter={eventStyleGetter}
          selectable={true}
          onSelectSlot={handleEventClick}
          onSelectEvent={selectEvent}
        />
        <PriorityModal close={close} time={time} />
      </Wrapper>
    </div>
  )
}
