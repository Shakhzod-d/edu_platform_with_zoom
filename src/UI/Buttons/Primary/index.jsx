import React from 'react'
import { Button } from 'antd'

export default function Primary({ flex, submit, rounded, children, className, ...props }) {
  return (
    <Button
      size="large"
      shape={rounded && 'round'}
      type="primary"
      htmlType={submit ? 'submit' : 'button'}
      className={`bg-green ${flex ? 'flex-items-center gap-x-2' : ''} 
        ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}
