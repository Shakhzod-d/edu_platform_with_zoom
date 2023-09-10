import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, usersApi, authGoogleApi } from '@/api/index.js'
import { history } from '@/libs/utils/index.js'
import { setLocalStorage } from '@/libs/utils'
import { setLoading } from './features.js'
import { addNotification } from '@/libs/utils/addNotification.js'

export const userSignUp = createAsyncThunk('user/sign-up', async (params, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const { data } = await authApi.signUp(params.option)
    if (data.token) {
      setLocalStorage('access-token', data.token)
      history.push('/student')
    }
  } catch (error) {
    addNotification(error)
  } finally {
    dispatch(setLoading(false))
  }
})

export const userSignIn = createAsyncThunk('/user/SignIn', async (params, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const { data } = await authApi.signIn(params)
    console.log(data)
    if (data.token && data.token !== null) {
      setLocalStorage('access-token', data.token)
      history.push('/student')
    }
  } catch (error) {
    addNotification(error)
  } finally {
    dispatch(setLoading(false))
  }
})

export const userResetPassword = createAsyncThunk(
  'user-reset-password',
  async (params, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await authApi.resetPassword(params?.option)
      if (data.status && data.status === 200) {
        params.navigate('/reset')
      }
    } catch (error) {
      addNotification(error)
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const userChangePassword = createAsyncThunk(
  'user/change-password',
  async (params, { dispatch }) => {
    try {
      const { data } = await authApi.changePassword(params)
      console.log(data)
    } catch (error) {
      addNotification(error)
    } finally {
      dispatch(setLoading(false))
    }
  }
)

// techer register
export const teacherBecome = createAsyncThunk('teacher/beacome', async (params, { dispatch }) => {
  console.log(params)
  try {
    dispatch(setLoading(true))
    const { data } = await usersApi.becomeTeacher(params)

    console.log(data)
  } catch (error) {
    console.log(error)
    addNotification(error)
  } finally {
    dispatch(setLoading(false))
  }
})
