import { Form, Row, Typography } from 'antd'
import { EmailField, PasswordField } from '@/components/index.js'
import { Link } from 'react-router-dom'
import { Primary } from '@/UI/index.js'

export const SetUpForm = ({ isSignIn, onFinish }) => {
  return (
    <Form layout="vertical" onFinish={onFinish} className={`${isSignIn ? 'w-full' : 'w-80'}`}>
      <EmailField />

      <PasswordField name="password" label="Password" placeholder="Enter a password" />

      {/* <PasswordField
        name="passwordConfirm"
        label="password Confirm"
        placeholder="Enter a password Confirm"
      /> */}

      <Primary block submit rounded className="mb-3">
        {isSignIn ? 'Log In' : 'Create account'}
      </Primary>

      {isSignIn ? (
        <Row justify="space-between">
          <Link to={'/forgot'}>
            <Typography.Text strong>Forgot password?</Typography.Text>
          </Link>

          <Link to="/sign-up/student">
            <Typography.Text strong>Create new account</Typography.Text>
          </Link>
        </Row>
      ) : (
        <Row justify="end">
          <Link to={'/sign-in'}>
            <Typography.Text strong>I already have an account</Typography.Text>
          </Link>
        </Row>
      )}
    </Form>
  )
}
