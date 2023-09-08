import React from 'react'
import { Link } from 'react-router-dom'
import { arrowCourseCard } from '@/assets'
import { useMediaQuery } from 'react-responsive'
import CourceCardMobile from './Mobile'

export default function CourseCard({ course, type = 'courses' }) {
  const inMobile = useMediaQuery({ query: '(max-width: 428px)' })

  const inDesktop = (
    <div className={`courses-card group ${type === 'courses' ? ' w-full' : 'w-full h-[496px]'} `}>
      <img width={305} height={289} src={course?.img} alt="Course's Author" />

      <div className="footer-primary">
        <h3 className="footer-title">{course?.title || 'default title'}</h3>
        {type === 'details' ? (
          <p className="text-base leading-6 text-graycc mt-2">
            Gain confidence and fluency in conversational English.{' '}
          </p>
        ) : (
          <div className="footer-bottom">
            <span className="card-degree">{course?.degree || 'Beginner'}</span>
            <span>{course?.lessonsCount || '5'} Lesson</span>
            <Link to="/courses/1">
              <img className="course-card-btn" src={arrowCourseCard} alt="Arrow" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )

  return <>{inMobile ? <CourceCardMobile course={course} /> : inDesktop}</>
}
