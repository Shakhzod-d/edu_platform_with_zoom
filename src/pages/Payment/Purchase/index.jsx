import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Space } from 'antd'
import { payments } from 'src/libs/constants'
import { Wrapper, Primary } from '@/UI'
import { Modal } from './Modal'
import Stripe from './Stripe'

export default function Purchase() {
  const [paymentId, setPaymentId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [totalPrice, setTotalPrice] = useState(Number(localStorage.getItem('totalPrice')))
  const [currentPlan, setCurrentPlan] = useState(JSON.parse(localStorage.getItem('currentPlan')))
  const [currentPrice, setCurrentPrice] = useState(
    totalPrice - (currentPlan?.discountPercent * totalPrice) / 100
  )
  const [currentPercent, setCurrentPercent] = useState(
    (currentPlan?.discountPercent * totalPrice) / 100
  )

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  function getMethod() {
    localStorage.setItem('payment_method', payments[paymentId].title)
    openModal()
  }

  useEffect(() => {
    localStorage.setItem(
      'paymentPrice',
      totalPrice - (currentPlan?.discountPercent * totalPrice) / 100
    )
  }, [])

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <div>
        <Wrapper className="flex xl:flex-row flex-col justify-between xl:items-center items-start mb-5 xl:px-6 px-4">
          <h2 className="xl:mb-0 mb-3">Coupon code</h2>

          <Space.Compact className="xl:w-3/5 w-full" size="large">
            <Input placeholder="Please enter your code" />
            <Button className="text-green">Submit</Button>
          </Space.Compact>
        </Wrapper>

        <Wrapper className="xl:px-6 px-4">
          <h2 className="mb-5">Payment Methods</h2>

          <ul>
            {payments.map(({ id, title, src }) => (
              <div
                key={id}
                className={`payment-label ${
                  id === Number(paymentId) ? 'payment-label-active' : null
                } flex-between`}
                onClick={() => setPaymentId(id)}
              >
                <div className="flex-items-center">
                  <img src={src} alt={title} />
                  <p className="ml-5 font-semibold">{title}</p>
                </div>

                <div className="paymentRadio">
                  <li className={id === Number(paymentId) ? 'bg-green' : null}></li>
                </div>
              </div>
            ))}
          </ul>
        </Wrapper>
      </div>

      <div>
        <Wrapper className="flex-col mb-5 xl:px-6 px-4">
          <h2 className="mb-3">Plan summary</h2>

          <div className="xl:flex gap-y-4 hidden">
            <p>30 minutes per day, 2 days per week | Quarter</p>

            <span className="mx-2 text-green">&#x2022;</span>
            <Link to="/plan" className="text-green-500 underline">
              Change
            </Link>
          </div>

          <ul className="summary">
            <li className="flex-col">
              <div className="flex-between w-full">
                <span>Total Price</span>
                <span>${totalPrice || 0}</span>
              </div>

              <div className="flex-between w-full">
                <p className="text-xs mt-2">
                  <span style={{ textTransform: 'capitalize' }}>{currentPlan?.name}</span>{' '}
                  subscription: {currentPlan?.discountPercent || 0}% off
                </p>
                <p className="text-xs text-end mt-2">-${currentPercent.toFixed(2) || 0}</p>
              </div>
            </li>

            {/* <li>
              Monthly Price
              <span>$80.10</span>
            </li>

            <li>
              Subtotal (3 month)
              <span>$240.30</span>
            </li> */}
          </ul>

          <div className="w-full flex-between bg-gray-50 p-5 rounded-10">
            <h4 className="xl:text-xl text-base">Total due today (in USD)</h4>

            <span className="text-green-500 font-bold xl:text-xl text-base">
              ${currentPrice || 0}
            </span>
          </div>
        </Wrapper>

        <Primary className="w-full" onClick={getMethod}>
          Purchase
        </Primary>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Stripe />
      </Modal>
    </div>
  )
}
