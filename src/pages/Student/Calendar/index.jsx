import { Wrapper } from '@/UI'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)
import 'react-big-calendar/lib/css/react-big-calendar.css'

export function StudentCalendar() {
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

  const events = [
    {
      start: new Date(2023, 8, 20, 14, 30),
      end: new Date(2023, 8, 20, 16, 30),
      title: 'Tadbir',
    },
    {
      start: new Date(2023, 4, 18, 14, 30),
      end: new Date(2023, 4, 18, 16, 30),
      title: 'Tadbir',
    },
    {
      start: new Date(2023, 4, 10, 10, 30),
      end: new Date(2023, 4, 10, 11, 30),
      title: 'Tadbir',
    },
    {
      start: new Date(2023, 4, 2, 14, 30),
      end: new Date(2023, 4, 2, 16, 30),
      title: 'Tadbir',
    },
  ]

  return (
    <Wrapper size="medium">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        step={15}
        timeslots={2}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        selectable={true}
        // onSelectSlot={handleEventClick}
      />
    </Wrapper>
  )
}
