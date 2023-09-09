import React from 'react'
import { Primary, Wrapper } from '@/UI'
import { Divider } from 'antd'
import { day, chat, week, time, review, source } from '@/assets'
import { history } from '@/libs/utils'

export default function LessonCard({ button = false, completed = false, item }) {
  const addZero = (number) => (number < 10 ? `0${number}` : number)

  function convertUTCDateToLocalDate(date) {
    let newDate = `${addZero(new Date(date).getHours())}:${addZero(
      new Date(date).getMinutes()
    )} - ${addZero(new Date(date).getHours())}:${addZero(new Date(date).getMinutes())}`
    return newDate
  }

  const gotoRoom = () => {
    history.push(`/student/room/${item?.zoom?.createRoom}`)
  }

  return (
    <>
      <Wrapper className="mb-5 xl:px-8 px-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-x-2">
            <img
              className="dash-card-thumb w-14 h-14"
              src={'https://picsum.photos/id/237/200/300'}
              alt="Person"
            />
            <h3 className="font-bold">{item?.teacher?.displayname}</h3>
          </div>
          {button ? (
            button
          ) : (
            <div className="flex gap-x-1">
              <img src={week} alt="Week" />

              <p>Week 1 - Lesson 3</p>
            </div>
          )}
        </div>
        <div className="flex gap-x-5 items-center">
          <div className="flex">
            <img src={day} alt="Day" />
            <p>{item?.dateFrom?.slice(0, 10)}</p>
          </div>
          <div className="flex">
            <img className="opacity-60 mr-1" src={time} alt="Time" />
            <p>
              {!!item?.dateFrom &&
                convertUTCDateToLocalDate(item?.dateFrom) + ' ' + !!item?.dateTo &&
                convertUTCDateToLocalDate(item?.dateTo)}
            </p>
          </div>
        </div>
        {completed ? (
          <>
            <Divider className="my-3" />
            <div className="grid grid-cols-3">
              <button className="flex items-center justify-center">
                <img src={review} alt="Review" className="w-5" />
                <p className="text-sm mt-1">Your review</p>
              </button>

              <button className="flex items-center justify-center">
                <img src={chat} alt="Chat" className="w-5" />
                <p className="text-sm mt-1">Open chat</p>
              </button>

              <button className="flex items-center justify-center">
                <img src={source} alt="Source" className="w-5" />
                <p className="text-sm mt-1">Source files</p>
              </button>
            </div>
            <p className="ml-auto opacity-60 italic text-sm text-end mt-4">
              Completed at: <time>10.03.2023 12:32 AM</time>
            </p>
          </>
        ) : (
          ''
        )}
        <Primary onClick={gotoRoom} htmlType="button">
          Visit meeting room
        </Primary>
      </Wrapper>
    </>
  )
}
