import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '@/libs/utils/index.js'
import { API } from '@/libs/constants/api.js'
import rest from '@/libs/services/rest.js'

const name = 'event'

const initialState = {
  events: [], // Upcoming | Live | Need Schedule | Completed
  priorityHours: [],
  freePriorityHours: [],
  event: {},
  bookedEvents: [],
}

export const addPriorityHour = createAsyncThunk(
  getPrefix('name', 'addPriorityHour'),
  async (option) => {
    const response = await rest.post(API.EVENT_ADD, option)
    return response.data
  }
)

export const getPriorityHours = createAsyncThunk(
  getPrefix('name', 'getPriorityHours'),
  async (tutorId) => {
    const { data } = await rest.get(`${API.EVENT_ALL_ID}/${tutorId}`)
    return data.data
  }
)

export const getWeeklyClass = createAsyncThunk(
  getPrefix('student', 'getWeeklyClass'),
  async (data) => {
    const { dateFrom, dateTo, statusName } = data
    const response = await rest.get(
      `http://single.uz/api/event/user?dateFrom=${dateFrom}&dateTo=${dateTo}&statusName=${statusName}`
    )
    return response.data.data
  }
)

const eventSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPriorityHour.fulfilled, (state, action) => {
        state.priorityHours = action.payload
      })
      .addCase(getPriorityHours.fulfilled, (state, actions) => {
        state.events = actions.payload
      })

    builder.addCase(getWeeklyClass.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.events = action.payload
    })
  },
})

export const getMyEvents = (state) => state.event
export default eventSlice.reducer
