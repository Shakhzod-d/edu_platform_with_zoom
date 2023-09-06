import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Lesson } from '@/UI'
import { LessonCard } from '@/components'
import { useMedia } from 'src/libs/hooks'
import { getCurrentWeek } from '../helper'
import { getWeeklyClass } from '@/libs/slices/eventSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Live() {
  const { events } = useSelector((state) => state.event) // events = Live = started
  const dispatch = useDispatch()

  // console.log("Live",events)

  useEffect(() => {
    dispatch(getWeeklyClass(getCurrentWeek(`started`)))
  }, [])

  const { isMobile } = useMedia()
  return (
    <div className="w-full">
      <LessonCard
        button={
          <Link to={'/'}>
            <Lesson className={isMobile ? '!px-2 !py-2' : ''}>Enter lesson</Lesson>
          </Link>
        }
      />
    </div>
  )
}
