import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '@/libs/utils/index.js'
import { API } from '@/libs/constants/api.js'
import rest from '@/libs/services/rest.js'

const name = 'event'

const initialState = {
  lessonDurationWeek: [],
  subscriptionPlan: [],
  userMe: {},
  userPlan: {},
}

// 

export const getLessonDurationWeek = createAsyncThunk(
  getPrefix('plan', 'getLessonDurationWeek'),
  async () => {
    const response = await rest.get(API.LESSON_DURATION_WEEK)
    return response?.data?.data
  }
)

export const getSubscriptionPlan = createAsyncThunk(
  getPrefix('plan', 'getSubscriptionPlan'),
  async () => {
    const response = await rest.get(API.SUBSCRIPTION_PLAN)
    return response?.data?.data
  }
)

export const getUserMe = createAsyncThunk(getPrefix('user', 'getUserMe'), async () => {
  const response = await rest.get(API.USER_ME)
  return response?.data?.data
})

export const buyUserPlan = createAsyncThunk(getPrefix('plan', 'buyUserPlan'), async (data) => {
  const response = await rest.post(API.USER_PLAN, data)
  const resData = await response.json()
  console.log('response', response)
  return resData
})

const paymentSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLessonDurationWeek.fulfilled, (state, action) => {
        state.lessonDurationWeek = action.payload?.map((item) => ({
          ...item,
          value: item?.id,
          label: `${item?.minut} minutes`,
        }))
      })
      .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
        state.subscriptionPlan = action.payload
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.userMe = action.payload
      })
      .addCase(buyUserPlan.fulfilled, (state, action) => {
        console.log(action.payload)
        state.userPlan = action.payload
      })
  },
})

export default paymentSlice.reducer
