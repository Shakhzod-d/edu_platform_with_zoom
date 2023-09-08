import React, { Fragment, useEffect } from 'react'
import { LessonCard } from '@/components'
import { ScheduleLesson } from '@/UI'
import { Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getWeeklyClass } from '@/libs/slices/eventSlice'
import { getCurrentWeek } from '../helper'

export default function Upcoming() {
  const { events } = useSelector((state) => state.event) // events = Upcoming
  const dispatch = useDispatch()
  const course = true
  const lesson_today = false

  // console.log(events)

  useEffect(() => {
    dispatch(getWeeklyClass(getCurrentWeek('bocked')))
  }, [])

  return (
    <Fragment>
      {course ? (
        <div className="w-full">
          <Divider>Today's lessons</Divider>
          {lesson_today ? (
            <>
              {events?.map((item, idx) => (
                <LessonCard key={idx} />
              ))}
            </>
          ) : (
            <h3 className="text-center font-bold">No lessons scheduled for today</h3>
          )}

          <Divider>Upcoming events</Divider>
          {[1, 2, 3, 4].map((id) => (
            <LessonCard key={id} />
          ))}
        </div>
      ) : (
        <ScheduleLesson text="You have no scheduled lessons. Select a teacher to get started." />
      )}
    </Fragment>
  )
}
