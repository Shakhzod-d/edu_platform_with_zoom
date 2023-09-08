import React, { Fragment, useEffect } from 'react'
import { LessonCard } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentWeek } from '../helper'
import { getWeeklyClass } from '@/libs/slices/eventSlice'

export default function Completed() {
  const { events } = useSelector((state) => state.event) // events = Completed
  const dispatch = useDispatch()

  // console.log(`Completed`, events)

  useEffect(() => {
    dispatch(getWeeklyClass(getCurrentWeek(`completed`)))
  }, [])

  return (
    <Fragment>
      <div className="w-full">
        <LessonCard completed={true} />
      </div>
    </Fragment>
  )
}
