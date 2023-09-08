
import { ScheduleLesson } from '@/UI'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentWeek } from '../helper'
import { getWeeklyClass } from '@/libs/slices/eventSlice'

export default function Schedule() {
  const { events } = useSelector((state) => state.event) // events = Schedule
  const dispatch = useDispatch()

  console.log(`Schedule`, events)

  useEffect(() => {
    dispatch(getWeeklyClass(getCurrentWeek(`respond`)))
  }, [])

  return (
    <Fragment>
      <ScheduleLesson text="You have already scheduled 8/12 lessons. You need schedule again 4 lessons." />
    </Fragment>
  )
}
