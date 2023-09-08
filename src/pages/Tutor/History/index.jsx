import { Wrapper } from '@/UI'
import { useState } from 'react'
import { Files } from '@/components'
import { Form, Input } from 'antd'
import { star, searchGray } from '@/assets'

const History = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Wrapper className="flex-between py-7">
        <ul className="history-statistics">
          <li>
            <h4>$140.45</h4>
            <p>current balance</p>
          </li>
          <li>
            <div className="flex-center gap-x-2">
              <img src={star} alt="star" />
              <h4>4.9</h4>
            </div>
            <p>total chats</p>
          </li>
          <li>
            <h4>45</h4>
            <p>current balance</p>
          </li>
          <li>
            <h4>45</h4>
            <p>total chats</p>
          </li>
          <li>
            <h4>140</h4>
            <p>current balance</p>
          </li>
          <li>
            <h4>$140.45</h4>
            <p>total chats</p>
          </li>
        </ul>
      </Wrapper>

      <Wrapper className="mt-10">
        <div className="flex-between">
          <h4 className="text-2xl">Call log</h4>
          <Form>
            <Form.Item className="w-full">
              <div className="relative w-full h-[60px]">
                <img
                  src={searchGray}
                  className="absolute z-10 left-7 top-[50%] -translate-y-[50%]"
                  alt="Search"
                />

                <Input
                  onChange={({ target: { value } }) => setValue(value.toLowerCase())}
                  placeholder="Search file"
                  className="h-full w-[540px] border-gray placeholder:text-lg pl-16"
                />
              </div>
            </Form.Item>
          </Form>
        </div>
        <Files file={''} type="history" />
      </Wrapper>
    </>
  )
}

export default History
