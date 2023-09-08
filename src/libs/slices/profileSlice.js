import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '@/libs/utils/index.js'
import rest from '@/libs/services/rest.js'
import { API } from '@/libs/constants/api.js'
import { LoadingStatus } from '@/model/common.js'

const name = 'profile'

const initialState = {
  user: null,
  profileLoaded: false,
  status: LoadingStatus.idle,
  isProfileLoaded: false,
  responseMessage: '',
  errorMessage: '',
}

export const fetchUser = createAsyncThunk(getPrefix(name, 'fetchUser'), async () => {
  const response = await rest.get(API.USER)
  return response.data
})

export const updateUser = createAsyncThunk(getPrefix(name, 'updateUser'), async (data) => {
  const response = await rest.post(API.USER, data)
  return response.data
})

export const respondEvent = createAsyncThunk(getPrefix(name, 'createEvent'), async (data) => {
  const response = await rest.post(`/api/event/respond`, data.body)
  return response.data
})

export const getMe = createAsyncThunk(getPrefix(name, 'getMe'), async () => {
  const response = await rest.get(API.ME)
  return response.data
})
// https://single.uz/api/lesson-duration-week

export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      console.log(2222)

      state.responseMessage = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = LoadingStatus.idle
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = LoadingStatus.pending
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null
        state.status = LoadingStatus.rejected
        state.errorMessage = action.error
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = LoadingStatus.idle
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.user = payload.data
      })
      .addCase(respondEvent.fulfilled, (state, action) => {
        state.message = action.payload
        state.status = LoadingStatus.idle
      })
      .addCase(respondEvent.pending, (state) => {
        state.status = LoadingStatus.pending
      })
      .addCase(respondEvent.rejected, (state, action) => {
        state.responseMessage = action.error
        state.status = LoadingStatus.idle
      })
  },
})

export const getMeUser = (state) => state.profile

export const { setErrorMessage } = profileSlice.actions

export default profileSlice.reducer
