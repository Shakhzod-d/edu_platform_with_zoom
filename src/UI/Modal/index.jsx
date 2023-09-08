import { useContext } from 'react'
import { ModalContext } from '@/context'
import { Modal as AntModal } from 'antd'

export default function Modal({ children, ...props }) {
  const { visible } = useContext(ModalContext)

  return (
    <AntModal open={visible} footer={null} {...props}>
      <div className="p-6">{children}</div>
    </AntModal>
  )
}
