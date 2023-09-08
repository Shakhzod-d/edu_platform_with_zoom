import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '@/libs/utils/index.js'
import { API } from '@/libs/constants/api.js'
import rest from '@/libs/services/rest.js'

const name = 'course'

const initialState = {
  courses: [],
}

const getAllCourses = createAsyncThunk(getPrefix(name, 'getAllCourses'), async () => {
  const res = await rest.get(API)
  return res.data
})

const courseSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courses = action.payload
    })
  },
})

export default courseSlice.reducer
