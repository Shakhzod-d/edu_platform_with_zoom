import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '@/libs/utils/index.js'
import { API } from '@/libs/constants/api.js'
import rest from '@/libs/services/rest.js'

const name = 'teacher'

const initialState = {
  teachers: [],
  slots: [],
  responds: [],
}

export const getTeachersList = createAsyncThunk(
  getPrefix('teacher', 'getTeachersList'),
  async (data) => {
    const response = await rest.get(API.TEACHER_LIST, data)
    return response.data.data
  }
)

export const getSlotList = createAsyncThunk(getPrefix('teacher', 'getSlotList'), async (data) => {
  const { tutorId, dateFrom, dateTo, statusName } = data
  const response = await rest.get(
    `${API.SLOTS_LIST}/${tutorId}?dateFrom=${dateFrom}&dateTo=${dateTo}&statusName=${statusName}`
  )
  return response.data.data
})

export const createEvent = createAsyncThunk(getPrefix('event', 'createEvent'), async (data) => {
  const response = await rest.post(API.EVENT, data.headers, data.body)
  return response.data.data
})

export const getResponds = createAsyncThunk(getPrefix('event', 'getResponds'), async (data) => {
  const response = await rest.get(`${API.GET_RESPOND}?dateFrom=${data}&statusName=respond`)
  return response.data.data
})

export const setBocked = createAsyncThunk(getPrefix('event', 'setBocked'), async (data) => {
  const response = await rest.post(API.SET_BOCKED, data)
  return response.data
})

export const eventCancel = createAsyncThunk(getPrefix('event', 'eventCancel'), async (data) => {
  const response = await rest.post(API.EVENT_CANCEL, data)
  return response.data
})

export const bookedCancel = createAsyncThunk(getPrefix('event', 'bookedCancel'), async (data) => {
  const response = await rest.post(API.EVENT_BOOKED_CANCEL, data)
  return response.data
})

export const eventStart = createAsyncThunk(getPrefix('event', 'eventStart'), async (data) => {
  const response = await rest.post(API.EVENT_START, data)
  return response.data
})

const teacherSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeachersList.fulfilled, (state, action) => {
      state.teachers = action.payload
    })
    builder
      .addCase(getSlotList.fulfilled, (state, action) => {
        state.slots = action.payload
      })
      .addCase(getResponds.fulfilled, (state, action) => {
        state.responds = action.payload
      })
  },
})

export default teacherSlice.reducer
