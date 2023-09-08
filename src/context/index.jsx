import { createContext, useState } from 'react'

export const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [bar, setBar] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const handleShow = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleShow2 = () => {
    setVisible2(true)
  }

  const handleCancel2 = () => {
    setVisible2(false)
  }

  const barShow = () => {
    setBar(true)
  }
  const barClose = () => {
    setBar(false)
  }

  return (
    <ModalContext.Provider
      value={{
        show: handleShow,
        close: handleCancel,
        show2: handleShow2,
        close2: handleCancel2,
        barShow: barShow,
        barClose: barClose,
        visible,
        visible2,
        setVisible,
        bar,
        setBar,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
