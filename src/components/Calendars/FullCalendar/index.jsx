import React from 'react'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar({ setCurrentEvents }) {
  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selected.view.calendar
    calendarApi.unselect()
    console.log(selected)
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      })
    }
  }

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove()
    }
  }

  return (
    <FullCalendar
      height="150vh"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateClick}
      eventClick={handleEventClick}
      /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      eventsSet={(events) => setCurrentEvents(events)}
      // timeZone="UZ"
      initialEvents={[
        {
          id: '12315',
          title: 'All-day event',
          date: '2023-04-20',
        },
        {
          id: '5123',
          title: 'Timed event',
          date: '2022-09-28',
        },
      ]}
    />
  )
}
