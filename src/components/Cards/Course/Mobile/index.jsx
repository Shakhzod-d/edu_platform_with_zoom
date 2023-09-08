import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'

export default function CourceCardMobile({ course }) {
  return (
    <Link to="/courses/1" className="flex-column rounded-tr-2xl rounded-tl-2xl w-full">
      <img
        className="rounded-tr-2xl h-[184px] rounded-tl-2xl w-full object-cover"
        src={course?.img}
        alt={course?.title}
      />
      <div className="p-4 border border-gray-100 rounded-bl-2xl rounded-br-2xl relative bg-white">
        <div className="absolute top-[-40px] left-[16px]">
          <Tag className="opacity-60" color="black">
            {course?.status || 'default'}
          </Tag>
          <Tag className="opacity-60" color="black">
            {course?.lessonCount || 'default'}
          </Tag>
        </div>
        <Link to="/courses/1" className="font-medium text-lg">
          {course?.title || 'default'}
        </Link>
        <p className="mt-4 text-[#858585]">{course?.desc || 'default'}</p>
      </div>
    </Link>
  )
}
