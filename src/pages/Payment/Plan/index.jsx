import React, { useState } from 'react'
import { Wrapper, Primary } from '@/UI'
import { history } from 'src/libs/utils'
import { Select, Form } from 'antd'
import { plans, timeOptions, dayOptions } from 'src/libs/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getLessonDurationWeek, getSubscriptionPlan, getUserMe } from '@/libs/slices/paymentSlice'

export default function Plan() {
  const { lessonDurationWeek, subscriptionPlan, userMe } = useSelector((state) => state.payment)
  const [level, setLevel] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [userSumma, setUserSumma] = useState(0)
  const dispatch = useDispatch()

  const test = (id) => {
    const currentItem = lessonDurationWeek.find((item) => item.id === id)
    const summa = userMe.whom === `adult` ? currentItem.priceAdult : currentItem.priceKid
    summa && setUserSumma(summa)

    // lessonDurationWeek
    localStorage.setItem('lessonDurationWeekId', id)

    console.log('id', id, 'level', level)
  }

  const selectPlan = (id, totalPrice) => {
    setLevel(id)
    setTotalPrice(totalPrice)

    const currentPlan = subscriptionPlan.find((item) => item.id === id)

    localStorage.setItem('paymentType', currentPlan?.name)
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan))
    localStorage.setItem('subscriptionPlanId', id)
  }

  const onFinish = (values) => {
    localStorage.setItem('paymentPrice', totalPrice)
    // console.log('Received values of form: ', values)
    history.push('/payment')
  }

  useEffect(() => {
    dispatch(getLessonDurationWeek())
    dispatch(getSubscriptionPlan())
    dispatch(getUserMe())
  }, [])

  return (
    <>
      <div className="flex-center flex-col mb-10">
        <h2>Private 1:1 plan</h2>

        <p className="text-center">Start learning English with a private tutor today!</p>
      </div>

      <Form
        onFinish={onFinish}
        layout="vertical"
        className="grid xl:grid-cols-2 md:grid-cols-1 gap-5"
      >
        <Wrapper className="h-60">
          <h4 className="mb-5">Weekly agenta</h4>

          <Form.Item
            name="time"
            initialValue={0}
            rules={[{ required: true, message: 'Please select minutes!' }]}
          >
            <Select
              onChange={(id) => {
                test(id)
                // localStorage.setItem('lessonDurationId', id)
              }}
              options={lessonDurationWeek}
            />
          </Form.Item>

          {/* <Form.Item
            name="days"
            initialValue={0}
            rules={[{ required: true, message: 'Please select days!' }]}
          >
            <Select options={dayOptions} />
          </Form.Item> */}
        </Wrapper>

        <div>
          <Wrapper>
            <h4 className="mb-5">Pick a commitment level</h4>

            <ul>
              {subscriptionPlan.map((item) => {
                const { id, name } = item
                const totalPrice =
                  (name === `week` && userSumma * 1) ||
                  (name === `month` && userSumma * 4) ||
                  (name === `quarter` && userSumma * 13) ||
                  (name === `year` && userSumma * 52)

                return (
                  <li
                    key={id}
                    className={`payment-label ${
                      id === Number(level) ? 'payment-label-active' : null
                    } flex-between`}
                    onClick={() => selectPlan(id, totalPrice)}
                  >
                    <div className="flex-col flex-start">
                      <h4 style={{ textTransform: 'capitalize' }}>{name}</h4>
                      {/* <p>{details}</p> */}
                    </div>
                    <p>
                      <span className="font-bold">${totalPrice || 0}</span>
                    </p>
                  </li>
                )
              })}
            </ul>
          </Wrapper>

          <Primary submit className="w-full" style={{ marginTop: '1rem' }}>
            Select Plan
          </Primary>
        </div>
      </Form>
    </>
  )
}
