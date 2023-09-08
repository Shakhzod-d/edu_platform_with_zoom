import { Modal } from '@/UI'
import { Avatar, List, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { bookedCancel, setBocked } from '@/libs/slices/teacherSlice'
import { Input, Form } from 'antd'
import { clock, light, schedule } from '@/assets'
import { useState } from 'react'

export default function ReservationModal({ close, id }) {
  const dispatch = useDispatch()
  const [bocked, setBooked] = useState(false)

  const henlerClose = () => {
    const option = {
      event: { id: id },
    }
    dispatch(setBocked(option))
    close()
  }

  const handlerOpen = () => {
    setBooked(true)
  }

  const hendlerCancelBocked = (values) => {
    const opt = {
      event: {
        id: id,
      },
      report: {
        descr: values.descr,
      },
    }
    dispatch(bookedCancel(opt))
  }

  const data = [
    {
      title: 'Ali',
      icon: schedule,
    },
    {
      title: 'Wednesday 01/04/2023  03:00 PM',
      icon: schedule,
    },
    {
      title: '60 minutes',
      icon: clock,
    },
    {
      title: 'Conversation Practise',
      icon: light,
    },
  ]

  return (
    <Modal className="!w-[400px]" onCancel={close}>
      <div className="w-full flex flex-col justify-around">
        <p className="text-xl font-bold text-[#000000]">Reservation</p>
      </div>
      <div className="w-full flex flex-col justify-around">
        <List
          itemLayout="horizontal"
          dataSource={data}
          split={false}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={<Avatar src={item.icon} />} title={item.title} />
            </List.Item>
          )}
        />
      </div>
      <div className="w-full flex flex-col items-center py-3">
        <p>Ali booked today at 05:55</p>
      </div>
      <div className="w-full flex items-center justify-around">
        <Button onClick={henlerClose} className="bg-[#39B980] text-white">
          I’ll be there
        </Button>
        <Button onClick={handlerOpen} className="bg-[#666666] text-white">
          I can’t make it
        </Button>
      </div>
      {bocked ? (
        <div className="w-full flex flex-col items-center py-3">
          <div className="w-full rounded-lg p-1 bg-[#E8C66F4D] text-[#826E06]">
            Students are often disappointed with cancellations, and an apologetic message can go a
            tong way!
          </div>
          <Form onFinish={hendlerCancelBocked} className="text-center">
            <Form.Item
              name="descr"
              className="w-full"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                placeholder="Cancellation reason..."
                className="w-full mt-1"
                cols={40}
                rows={3}
              />
            </Form.Item>
            <Button htmlType="submit" className="bg-[#EA4646] text-white">
              Cancel reservation
            </Button>
          </Form>
        </div>
      ) : null}
    </Modal>
  )
}
