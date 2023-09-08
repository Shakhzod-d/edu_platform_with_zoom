import React from 'react'
import { star } from '@/assets'
import { Link } from 'react-router-dom'

export default function TutorCard({ info }) {
  return (
    <div className="tutor-courses-card">
      <img
        className="tutor-courses-card-img"
        src="https://picsum.photos/200/300"
        alt="Tutor's avatar"
      />
      <div className="tutor-footer">
        <Link to="/tutor/1">{info?.name || 'John Doe'}</Link>
        <div className="flex-between">
          <p className="tutor-card-country">{info?.country || 'USA'}</p>
          <div className="flex-center gap-3">
            <span className="rating">{info?.rating || '5'}</span>
            <img className="mb-[5px]" src={star} alt="Rating" />
          </div>
        </div>
      </div>
    </div>
  )
}

// slick - slide slick - active slick - current
