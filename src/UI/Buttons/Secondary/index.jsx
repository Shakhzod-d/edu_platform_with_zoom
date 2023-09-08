import React from 'react'
import { Button } from 'antd'

export default function Secondary({ className, submit, icon, children, type, w, ...props }) {
  return (
    <Button
      htmlType={submit ? 'submit' : 'button'}
      className={`flex-center flex-between border-none w-full ${w} h-14 ${className}
       ${type === 'gray' ? 'bg-[#E6E6E6] h-[40px] !w-[146px]' : 'bg-green'}`}
      {...props}
    >
      <div className={`w-full flex-between ${type === 'gray' && 'flex-row-reverse'} `}>
        <span
          className={`font-medium text-base leading-6 ${
            type === 'gray' ? 'text-gray-CCC' : 'text-white'
          } `}
        >
          {children}
        </span>
        <img className={`${type === 'gray' && 'mb-1'}`} src={icon} alt="Icon" />
      </div>
    </Button>
  )
}
