import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { eventCancel } from '@/libs/slices/teacherSlice'
export default function TutorNotification({ data, open }) {
  const dispatch = useDispatch()
  const time = new Date(data?.dateFrom)
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  const localTime = time.toLocaleString('en-US', options)
  
  const openModal = () => {
    open(2)
  }

  const handlerEventCancel = () => {
    const opt = {
      event: {
        id: data?.id,
      },
    }
    dispatch(eventCancel(opt))
  }
  return (
    <div className="flex items-center flex-col">
      <div className="border border-gray-100 rounded-10 w-full">
        <p className="text-lg font-medium bg-gray-100 px-5 py-4 rounded-t-10">
          Reservation requests
        </p>
      </div>
      <div className="w-full bg-white file py-5 flex-col items-center rounded-b-5 px-2">
        <p className=" text-black my-2">
          <span className=" text-black font-medium">Student: </span>
          {data?.user?.firstname}
        </p>
        <p className=" text-black mb-2">
          <span className=" text-black font-medium">Date: </span>
          {localTime}
        </p>
        <div className="w-full flex items-center justify-around my-2">
          <Button onClick={handlerEventCancel} className="w-[120px] h-[35px]">
            Cancel
          </Button>
          <Button onClick={openModal} className="w-[120px] h-[35px]">
            Respond
          </Button>
        </div>
      </div>
    </div>
  )
}
