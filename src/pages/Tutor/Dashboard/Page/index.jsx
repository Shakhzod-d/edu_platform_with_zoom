import React, { useState } from 'react'
import { Wrapper } from '@/UI'
import { NavLink, Outlet } from 'react-router-dom'
import { tutorDashLinks } from 'src/libs/constants'
import { Switch } from 'antd'

export default function TutorDashboard() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="flex-column items-center">
      <Wrapper size="medium" className="w-3/4 flex-between">
        <ul className="flex-center gap-x-6">
          {tutorDashLinks.map(({ key, label }) => (
            <li key={key}>
              <NavLink
                to={`/tutor/dashboard/${label}`}
                className={({ isActive }) =>
                  `student-dash-link ${isActive && `student-dash-link-active`}`
                }
              >
                {key}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex-center">
          <p>Invisible</p>
          <Switch defaultChecked onChange={setVisible} className="mx-3" />
          <p>Visible</p>
        </div>
      </Wrapper>

      <div className="w-3/4 mt-5">
        {visible ? <Outlet /> : <p className="text-center">You are offline</p>}
      </div>
    </div>
  )
}
