import React, { useState } from 'react'

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { buyUserPlan } from '@/libs/slices/paymentSlice'

export default function PaymentForm() {
  const [success, setSuccess] = useState(false)
  const [errorInPayment, setErrorInPayment] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const buyUserPlanFunc = () => {
    const data = {
      lessonDurationWeek: {
        id: Number(localStorage.getItem('lessonDurationWeekId')),
      },
      subscriptionPlan: {
        id: Number(localStorage.getItem('subscriptionPlanId')),
      },
    }

    dispatch(buyUserPlan(data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement, CardCvcElement, CardExpiryElement),
    })

    const { id } = paymentMethod
    const data = {
      amount: JSON.parse(localStorage.getItem('paymentPrice')),
      id,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
      },
    }

    const url = 'http://single.uz/api/payment'

    try {
      const response = await axios.post(url, data, config)
      if (response.data.status === 200) {
        setSuccess(true)
        buyUserPlanFunc()
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorInPayment(true)
    }
  }

  return (
    <>
      {!success && !errorInPayment ? (
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            minHeight: '300px',
            display: 'flex',

            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Add a New Card</h2>
            <p>
              We currently support the bank cards from VISA, Mastercard, American Express, and
              UnionPay.
            </p>
            <br />
          </div>
          <fieldset className="FormGroup" style={{ width: '100%' }}>
            <label htmlFor="">Card Number</label>
            <div
              className="FormRow"
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#AAA',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e214',
                    },
                  },
                  // Change the placeholder text here
                  placeholder: 'Fill in your card number',
                }}
              />
            </div>
          </fieldset>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <fieldset
              className="FormGroup"
              style={{ width: 'calc(50% - 10px)', borderRadius: '4px' }}
            >
              <label htmlFor="">Expiration date:</label>
              <div
                className="FormRow"
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#AAA',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e214',
                      },
                    },
                    // Change the placeholder text here
                    placeholder: '08 / 20',
                  }}
                />
              </div>
            </fieldset>
            <fieldset className="FormGroup" style={{ width: 'calc(50% - 10px)' }}>
              <label htmlFor="">Security Code</label>
              <div
                className="FormRow"
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#AAA',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e214',
                      },
                    },
                    // Change the placeholder text here
                    placeholder: 'CVC',
                  }}
                />
              </div>
            </fieldset>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            <button
              style={{
                width: '213px',
                height: '40px',
                borderRadius: '40px',
                backgroundColor: '#39B980',
              }}
            >
              Pay
            </button>
          </div>
        </form>
      ) : (
        <>
          {success && (
            <div className="payment-success">
              <h2 style={{ color: 'green' }}>Payment successful</h2>
              <h3 className="Thank-you">Thank you for your patronage</h3>
            </div>
          )}
          {errorInPayment && <h2 style={{ textAlign: 'center', color: 'red' }}>Payment failed</h2>}
        </>
      )}
    </>
  )
}
