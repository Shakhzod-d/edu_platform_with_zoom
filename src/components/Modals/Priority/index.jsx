import { Modal } from '@/UI'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addPriorityHour } from '@/libs/slices/eventSlice'

export default function PriorityModal({ close, time }) {
  const dispatch = useDispatch()
  const henlerClose = () => {
    const option = {
      dateFrom: time.start,
      dateTo: time.end,
    }
    dispatch(addPriorityHour(option))
    close()
  }
  const from = new Date(time?.start)
  const to = new Date(time?.end)


  return (
    <Modal className="!w-[600px]" onCancel={close}>
      <div className="w-full flex flex-col justify-around items-center">
        <p className="text-xl font-bold text-green-500 my-5">Event time</p>
        <p className="text-sm font-medium">
          <span className="text-sm font-bold text-green-500 mr-2"> From:</span>{' '}
          {` ${from.getFullYear()}-${
            from.getMonth() > 10 ? from.getMonth() + 1 : '0' + (from.getMonth() + 1)
          }-${from.getDay() > 10 ? from.getDay() : '0' + from.getDay()} `}
          |{' '}
          <span>{` ${from.getHours() > 10 ? from.getHours() : '0' + from.getHours()} : ${
            from.getMinutes() > 10 ? from.getMinutes() : '0' + from.getMinutes()
          }`}</span>
        </p>
        <p className="text-sm font-medium">
          <span className="text-sm font-bold text-green-500 mr-2"> To:</span>
          {` ${to.getFullYear()}-${
            to.getMonth() > 10 ? to.getMonth() + 1 : '0' + (to.getMonth() + 1)
          }-${to.getDay() > 10 ? to.getDay() : '0' + to.getDay()}`}{' '}
          |{' '}
          <span>{` ${to.getHours() > 10 ? to.getHours() : '0' + to.getHours()} : ${
            to.getMinutes() > 10 ? to.getMinutes() : '0' + to.getMinutes()
          }`}</span>
        </p>
      </div>
      <Button onClick={henlerClose} className="w-[60px] ml-[85%] mt-2 bg-green-600 text-white">
        Yes
      </Button>
    </Modal>
  )
}
