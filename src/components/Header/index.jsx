import { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { logo, bar } from '@/assets'
import { ModalContext } from '@/context'
import { MobileNavbar } from '@/components'
import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Select } from 'antd'
import { ROUTES } from '@/libs/constants/routes'
import { userLinks, studentLinks, tutorLinks } from 'src/libs/constants'
import { HeaderLinks } from './Links'
import { getPathName, items } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, getMeUser } from '@/libs/slices/profileSlice'

export default function Header() {
  const { barShow, barClose } = useContext(ModalContext)
  const [account, setAccount] = useState({})
  const [links, setLinks] = useState([])
  const [status, setStatus] = useState('')
  const { pathname } = useLocation()
  const pathnameKey = getPathName(pathname)
  const dispatch = useDispatch()

  useEffect(() => {
    if (pathnameKey === ROUTES.tutor) {
      setLinks(tutorLinks)
      setStatus('tutor')
    } else if (pathnameKey === ROUTES.student) {
      setLinks(studentLinks)
      setStatus('student')
    } else {
      setLinks(userLinks)
      setStatus('user')
    }
    dispatch(getMe())
  }, [pathnameKey, ROUTES, dispatch])

  const { user } = useSelector(getMeUser)

  return (
    <header className="flex-center">
      <Link to={ROUTES.home} className="w-[180px] md:w-[30%] xl:w-[40%]">
        <img src={logo} alt="Logo" />
      </Link>

      <ul className="hidden ml-auto lg:flex-center md:gap-x-3 lg:gap-x-6 xl:gap-x-10 text-sm">
        {links.map(({ key, label }) => (
          <li key={key}>
            <NavLink to={`/${label}`} className={({ isActive }) => `${isActive && `underline`}`}>
              {key}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="ml-5 hidden lg:flex-center gap-x-4">
        {status === 'user' ? (
          <>
            <Select
              defaultValue="english"
              bordered={false}
              options={[
                {
                  value: 'english',
                  label: 'English-USD $',
                },
              ]}
            />

            <Button shape="round" size="large">
              <Link to={ROUTES.signIn}>Log in</Link>
            </Button>

            <Button shape="round" size="large">
              <Link to={`${ROUTES.signUp}${ROUTES.student}`}>Sign up</Link>
            </Button>
          </>
        ) : (
          <HeaderLinks path={status} />
        )}

        {status !== 'user' ? (
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={['click']}
            className="cursor-pointer"
          >
            <div className="flex-center gap-x-2">
              <img
                className="dash-card-thumb w-8 h-8"
                src={'https://picsum.photos/id/237/200/300'}
                alt="Person"
              />

              <h3>{`${user?.firstname} ${user?.lastname}`}</h3>

              <DownOutlined />
            </div>
          </Dropdown>
        ) : null}
      </div>

      <img onClick={() => barShow()} src={bar} alt="Menu bar" className="ml-auto lg:hidden" />

      <MobileNavbar links={links} close={barClose} status={status} items={items} />
    </header>
  )
}
