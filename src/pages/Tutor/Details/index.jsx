import React, { useEffect, useState } from 'react'
import {
  Tooltip,
  Badge,
  Avatar,
  Divider,
  Calendar,
  Pagination,
  Button,
  Row,
  Popover,
  message,
} from 'antd'
import { BsShare, BsHeart, star, verified, arrowLeft, verticalDots } from '@/assets'
import { Primary, Wrapper } from '@/UI'
import { useMedia } from '../../../libs/hooks'
import { TutorMobile } from './Mobile'
import ModalToBookHours from './ModalToBookHours/ModalToBookHours'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSlotList } from '@/libs/slices/teacherSlice'
import { respondEvent, setErrorMessage } from '@/libs/slices/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { history } from '@/libs/utils'

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode, value)
}

export default function Details() {
  const { slots } = useSelector((state) => state.teacher)
  const { errorMessage, responseMessage } = useSelector((state) => state.profile)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [today, setToday] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(state)
  // window.scrollTo(0, 0)
  // /student/tutors

  const openModal = () => {
    setIsModalOpen(true)
  }

  const tomorrow = (dt) => {
    let d = new Date(dt)
    d.setDate(d.getDate() + 1)

    let year = d.getFullYear()
    let month = String(d.getMonth() + 1)
    let day = String(d.getDate())

    month = month.length == 1 ? month.padStart('2', '0') : month

    day = day.length == 1 ? day.padStart('2', '0') : day

    return `${year}-${month}-${day}`
  }

  const handleSubmit = (date) => {
    const teacherSlotObj = {
      tutorId: id,
      dateFrom: date.format('YYYY-MM-DD') || '',
      dateTo: tomorrow(date.format('YYYY-MM-DD')) || '',
      statusName: 'created',
    }

    dispatch(getSlotList(teacherSlotObj))
    setToday(date.format('YYYY-MM-DD'))
    openModal()

    // console.log(teacherSlotObj)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  function convertUTCDateToLocalDate(date) {
    let newDate = `${addZero(new Date(date).getHours())}:${addZero(
      new Date(date).getMinutes()
    )} - ${addZero(new Date(date).getHours())}:${addZero(new Date(date).getMinutes())}`

    return newDate
  }

  const selectTimeSlot = (item) => {
    const eventObj = {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
      },
      body: JSON.stringify({
        event: {
          id: item.id,
        },
      }),
    }

    dispatch(respondEvent(eventObj))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log('response', originalPromiseResult)
        // shu qism da success message quyish lozim
        alert('Succesfully responded')
      })
      .catch((rejectedValueOrSerializedError) => {
        history.push('/plan')
        if (rejectedValueOrSerializedError === 'User plan lesson not found') {
          console.log(`rejectedValueOrSerializedError`, rejectedValueOrSerializedError)
          // navigate(`/plan`)
        }
      })

    // console.log('eventObj', JSON.parse(localStorage.getItem('access-token')))
  }

  const { isMobile } = useMedia()

  const addZero = (number) => (number < 10 ? `0${number}` : number)

  useEffect(() => {
    if (!!responseMessage?.message) {
      const timeoutId = setTimeout(() => {
        dispatch(setErrorMessage())
      }, 4000)

      return () => clearTimeout(timeoutId)
    }
  }, [!!responseMessage?.message])

  return (
    <>
      <ModalToBookHours isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-semibold">Free slots {(' ', !!today && today)}</h2>
        {!!responseMessage?.message && <h3 style={{ color: 'red' }}>{responseMessage?.message}</h3>}

        {slots.length > 0 ? (
          slots?.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0.4rem 0',
                  // border: '1px solid red',
                }}
              >
                <span>
                  {!!item?.dateFrom &&
                    convertUTCDateToLocalDate(item?.dateFrom) + ' ' + !!item?.dateTo &&
                    convertUTCDateToLocalDate(item?.dateTo)}
                </span>{' '}
                <Primary onClick={() => selectTimeSlot(item)} htmlType="button">
                  Select
                </Primary>
              </div>
            )
          })
        ) : (
          <div>Teacher did not spesify avaible time slot yet</div>
        )}
      </ModalToBookHours>

      {isMobile ? (
        <TutorMobile />
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-x-4">
          <div className="col-span-2 min-h-screen">
            <Wrapper className="mb-6">
              <div className="flex gap-x-8">
                <Badge className="relative">
                  <Avatar src={'https://picsum.photos/id/237/200/300'} size={110} />
                  <div className="absolute flex-items-center bg-white w-[20px] h-[20px] z-50 rounded-full right-1 bottom-3.5">
                    <span className="bg-green w-[14px] h-[14px] rounded-full" />
                  </div>
                </Badge>
                <div className="flex flex-col justify-between w-full">
                  <div className="w-full flex justify-between mb-5">
                    <h2>Teacher Darren</h2>
                    <div className="flex gap-x-6">
                      <Tooltip title="Share">
                        <button>
                          <BsShare size={18} />
                        </button>
                      </Tooltip>
                      <Tooltip title="Favourite">
                        <button>
                          <BsHeart size={18} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-2 bg-gray-400 flex-center flex-col rounded-10">
                      <h2>British</h2>
                      <p className="text-gray-700">Accent</p>
                    </div>
                    <div className="p-2 bg-gray-400 flex-center flex-col rounded-10">
                      <h2>435</h2>
                      <p className="text-gray-700">Students</p>
                    </div>
                    <div className="p-2 bg-gray-400 flex-center flex-col rounded-10">
                      <h2>7,205</h2>
                      <p className="text-gray-700">Lessons</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-6">
                <li className="text-gray-800">From China</li>
                <li className="text-gray-800">Living in Seoul, Republic of Korea</li>
              </div>
              <div>
                <ul className="flex justify-between my-3">
                  <h2>About</h2>
                  <li className="text-gray-500">edu-platform teacher since May 18, 2021</li>
                </ul>
                <li>
                  All language. One world.<br></br>Hello everyone! I do speak Chinese, English,
                  Japanese, and Korean, and plan to learn español. I really know how difficult to
                  learn a foreign language, and would like to share the secret. Normally, I prefer
                  to explain by using the easiest target words, but if you want to understand them
                  better from your language, I can also explain in the language that makes you feel
                  more comfortable. According to your level, I will adjust the speed and vocabs
                  picking. Take you to an immersive environment without going to China, a more
                  comfortable and interesting as talking with a close friend.
                </li>
              </div>
            </Wrapper>
            <Wrapper className="flex justify-around mb-6">
              <ul className="text-center">
                <ul className="flex justify-center gap-2">
                  <img src={star} alt="Rating" />
                  <h2>4.9</h2>
                </ul>
                <li>Ratings</li>
              </ul>
              <ul className="text-center">
                <h2>4.9</h2>
                <li>Ratings</li>
              </ul>
              <ul className="text-center">
                <h2>4.9</h2>
                <li>Ratings</li>
              </ul>
              <ul className="text-center">
                <h2>4.9</h2>
                <li>Ratings</li>
              </ul>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2 className="mb-3">Me as a teacher</h2>
              <p>
                I have been teaching for about 15 years, and one and a half years online. Several
                times I have been awarded for high student satisfaction. I have taught at all levels
                from beginner to advanced and even university preparation. I particularly enjoy
                grammar, but am able to assist in all aspects of language acquisition.
              </p>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2>
                Resume <span className="italic">(optional)</span>
              </h2>
              <div className="work-experience mt-5">
                <h3 className="font-semibold mb-2">Work experience</h3>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <ul>
                    <li>Lector Benedek Elek College</li>
                    <li>Benedek Elek College - Sopron, Hungary</li>
                  </ul>
                </ul>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <ul>
                    <li>Lector Benedek Elek College</li>
                    <li>Benedek Elek College - Sopron, Hungary</li>
                  </ul>
                </ul>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <ul>
                    <li>Lector Benedek Elek College</li>
                    <li>Benedek Elek College - Sopron, Hungary</li>
                  </ul>
                </ul>
              </div>
              <div className="education mt-5">
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <ul>
                    <li>Lector Benedek Elek College</li>
                    <li>Benedek Elek College - Sopron, Hungary</li>
                  </ul>
                </ul>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <ul>
                    <li>Lector Benedek Elek College</li>
                    <li>Benedek Elek College - Sopron, Hungary</li>
                  </ul>
                </ul>
              </div>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2 className="mb-3">
                Certificates <span className="italic">(optional)</span>
              </h2>
              <div className="certificates mt-5">
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <li className="flex justify-between">
                    Teaching English as a Second Language TEFL
                    <span className="text-green-500 mx-3 flex items-center">
                      <img src={verified} alt="logo" /> Verified
                    </span>
                  </li>
                </ul>
                <ul className="flex justify-between w-3/4 mb-4">
                  <li>2003-2007</li>
                  <li className="flex">
                    Teaching English as a Second Language TEFL
                    <span className="text-green-500 mx-3 flex items-center">
                      <img src={verified} alt="logo" />
                      Verified
                    </span>
                  </li>
                </ul>
              </div>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2 className="mb-3">Schedule</h2>
              <li className="my-3">Select a day</li>
              <div className="w-full border border-gray rounded-20 overflow-hidden">
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  onSelect={handleSubmit}
                />
              </div>

              <div className="mt-3">
                <Button
                  block
                  size="large"
                  shape="round"
                  type="primary"
                  ghost
                  htmlType="submit"
                  className="bg-green !h-12"
                >
                  Schedule Lesson
                </Button>
              </div>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2 className="mb-3">Reviews</h2>
              <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-5">
                <div className="rounded-10 bg-blue-50 border-2 border-gray-200 p-4">
                  <div className="w-3/4">
                    <div className="flex items-center mb-3">
                      <Avatar src={'https://picsum.photos/id/237/200/300'} size={60} />
                      <ul className="mx-3">
                        <h3 className="font-semibold">John Doe</h3>
                        <p>3 English lessons</p>
                      </ul>
                    </div>
                    <p>The interested warm up. Insist on learning more from Frank</p>
                    <p className="text-gray-500 my-2">Mar 8, 2023</p>
                  </div>
                </div>
                <div className="rounded-10 bg-blue-50 border-2 border-gray-200 p-4">
                  <div className="w-3/4">
                    <div className="flex items-center mb-3">
                      <Avatar src={'https://picsum.photos/id/237/200/300'} size={60} />
                      <ul className="mx-3">
                        <h3 className="font-semibold">John Doe</h3>
                        <p>3 English lessons</p>
                      </ul>
                    </div>
                    <p>The interested warm up. Insist on learning more from Frank</p>
                    <p className="text-gray-500 my-2">Mar 8, 2023</p>
                  </div>
                </div>
                <div className="rounded-10 bg-blue-50 border-2 border-gray-200 p-4">
                  <div className="w-3/4">
                    <div className="flex items-center mb-3">
                      <Avatar src={'https://picsum.photos/id/237/200/300'} size={60} />
                      <ul className="mx-3">
                        <h3 className="font-semibold">John Doe</h3>
                        <p>3 English lessons</p>
                      </ul>
                    </div>
                    <p>The interested warm up. Insist on learning more from Frank</p>
                    <p className="text-gray-500 my-2">Mar 8, 2023</p>
                  </div>
                </div>
                <div className="rounded-10 bg-blue-50 border-2 border-gray-200 p-4">
                  <div className="w-3/4">
                    <div className="flex items-center mb-3">
                      <Avatar src={'https://picsum.photos/id/237/200/300'} size={60} />
                      <ul className="mx-3">
                        <h3 className="font-semibold">John Doe</h3>
                        <p>3 English lessons</p>
                      </ul>
                    </div>
                    <p>The interested warm up. Insist on learning more from Frank</p>
                    <p className="text-gray-500 my-2">Mar 8, 2023</p>
                  </div>
                </div>
              </div>
              <Pagination className="w-full text-center mt-5" defaultCurrent={2} total={20} />
            </Wrapper>
          </div>
          <div className="col-span-1">
            <iframe
              className="w-full rounded-20 h-52 mb-6"
              src="https://www.youtube.com/embed/zJ0WMaYHIoU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <Wrapper className="mb-6">
              <h2>Trial lesson</h2>
              <p>One time, 15 minutes</p>
              <Divider className="opacity-50 my-3" />
              <ul className="flex flex-between">
                <li>Trial lesson</li>
                <li className="text-green">Free</li>
              </ul>
              <Primary htmlType="button" style={{ marginTop: '1rem' }}>
                Call
              </Primary>
            </Wrapper>
            <Wrapper className="mb-6">
              <h2>Private lesson</h2>
              <Divider className="opacity-50 my-3" />
              <Primary htmlType="button" style={{ marginBottom: '1rem' }}>
                Start Lesson
              </Primary>
              <Button
                block
                size="large"
                shape="round"
                type="primary"
                ghost
                htmlType="submit"
                className="bg-green !h-12"
              >
                Contact Lesson
              </Button>
            </Wrapper>
          </div>
        </div>
      )}
    </>
  )
}
