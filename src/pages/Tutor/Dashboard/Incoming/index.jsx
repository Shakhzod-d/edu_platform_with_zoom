import React from 'react'
import { Link } from 'react-router-dom'
import { CallCard } from '@/components'
import { Lesson } from '@/UI'

export default function Incoming() {
  return (
    <CallCard
      button={
        <Link to={'/'}>
          <Lesson type="blue">Start lesson</Lesson>
        </Link>
      }
    />
  )
}
