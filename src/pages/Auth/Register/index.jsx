import { Fragment } from 'react'
import { useSteps } from 'src/libs/hooks'
import { Steps } from 'antd'
import { tutorSteps } from 'src/libs/constants'
import { Wrapper, Primary } from '@/UI'
import { PersonalForm, ProfileForm, Finish } from 'src/libs/modules'

export default function TutorRegister() {
  const { next, prev, current } = useSteps()

  return (
    <Fragment>
      <Steps labelPlacement="vertical" current={current} items={tutorSteps} />

      <div className="flex-items-center flex-col mt-5">
        {current === 0 ? (
          <Wrapper className="w-3/4 flex-center flex-col p-10">
            <div className="flex mb-14 gap-x-5">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>

              <img
                className="w-[400px] h-[340px] object-cover"
                src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                alt="Welcome"
              />
            </div>

            <Primary rounded className="!w-[340px]" onClick={next}>
              Let's start
            </Primary>
          </Wrapper>
        ) : current === 1 ? (
          <PersonalForm prev={prev} next={next} />
        ) : current === 2 ? (
          <ProfileForm prev={prev} next={next} />
        ) : current === 3 ? (
          <Finish next={next} />
        ) : null}
      </div>
    </Fragment>
  )
}
