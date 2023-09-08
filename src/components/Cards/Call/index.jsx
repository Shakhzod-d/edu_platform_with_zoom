import React from 'react'
import { Wrapper } from '@/UI'
import { day, week, time } from '@/assets'

export default function CallCard({ button }) {
  return (
    <Wrapper className="mb-5 !p-8">
      <div className="dash-card">
        <div className="w-[10%]">
          <img
            className="dash-card-thumb"
            src={'https://picsum.photos/id/237/200/300'}
            alt="Person"
          />
        </div>

        <div className="w-[90%] flex justify-between py-1 items-center">
          <div className="dash-card-content">
            <h4>Saidalixon Sobirov</h4>
            <p>requested you</p>
          </div>
          <h3>15 minute class</h3>

          {button ? (
            button
          ) : (
            <div className="flex-center self-start gap-x-1">
              <img src={week} alt="Week" />

              <p>Week 1 - Lesson 3</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
