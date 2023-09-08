import { Modal } from '@/UI'
import { Input } from 'antd'
import { Primary } from '@/UI'
export default function AccountModal({ close, item }) {
  return (
    <Modal title={`Edit ${item.title}`} onCancel={close}>
      <Input value={item.value} size="large" placeholder="Enter first name" className="mt-5" />
      <div className="flex justify-end gap-x-4 mt-6">
        <button type="button" className="text-green" onClick={close}>
          Cancel
        </button>

        <Primary submit>Save</Primary>
      </div>
    </Modal>
  )
}
