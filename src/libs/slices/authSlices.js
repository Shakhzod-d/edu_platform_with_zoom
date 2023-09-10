import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addNotification, getPrefix, history, setLocalStorage } from '@/libs/utils'
import rest from '../services/rest'
import { API } from '../constants/api'

const name = 'auth'

const initialState = {
  user: {
    whom: '',
    email: '',
    password: '',
  },
  teacher: {
    user_displayname: '',
    user_accent: '',
    user_from: '',
    user_current_location: '',
    user_birthday: '',
    user_firstname: '',
    user_lastname: '',
    user_gender: '',
    user_photo: '',
    user_about: '',
    education: [],
    exprience: [],
    certificates: [],
  },
  data: null,
  token: null,
  isLoading: false,
  success: false,
  errorMessage: '',
  isAuth: null,
}
export const signup = createAsyncThunk(getPrefix(name, 'signup'), async (data) => {
  const res = await rest.post()
})

export const fetchUser = createAsyncThunk(getPrefix(name, 'fetchUser'), async () => {})

export const userResgister = createAsyncThunk(getPrefix(name, 'userRegister'), async (option) => {
  const data = await rest.post(API.REGISTER, option)
  if (data?.data?.token) {
    setLocalStorage('access-token', data?.data?.token)
    history.push('/student')
  }
})

export const login = createAsyncThunk(getPrefix(name, 'login'), async () => {})

export const userLogin = createAsyncThunk(getPrefix(name, 'userLogin'), async (option) => {
  try {
    const { data } = await rest.post(API.CLIENT_LOGIN, option)

    if (data?.data?.token) {
      setLocalStorage('access-token', data?.data?.token)
      if (data.data.role === 'tutor') {
        history.push('/tutor/dashboard/incoming')
      } else {
        history.push('/student')
      }
    }
  } catch (error) {
    addNotification(error)
  }
})

export const sendEmailCode = createAsyncThunk(
  getPrefix(name, 'sentEmailCode'),
  async ({ option }) => {
    try {
      const data = await rest.post(API.SEND_EMAIL, option)
    } catch (error) {
      addNotification(error.message)
    }
  }
)

export const checkCode = createAsyncThunk(getPrefix(name, 'checkCode'), async (option) => {
  const { data } = await rest.post(API.CHEK_CODE, option)
})

export const changePassword = createAsyncThunk(
  getPrefix(name, 'changePassword'),
  async (option) => {
    const { data } = await rest.put(API.CHANGE_PASSWORD, option)
  }
)

export const becomeTutor = createAsyncThunk(getPrefix(name, 'becomeTutor'), async (option) => {
  try {
    const { data } = await rest.put(API.BECOME_TUTOR, option)
    if (data) {
      addNotification(data)
    }
  } catch (error) {
    addNotification(error)
  }
})
const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false
      state.success = false
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload
    },

    setType: (state, { payload }) => {
      state.user.whom = payload
    },

    setLogin: (state, { payload }) => {
      state.user.email = payload.email
      state.user.password = payload.password
    },

    setToken: (state, { payload }) => {
      state.token = payload
    },

    setId: (state, { payload }) => {
      state.id = payload
    },

    setAuth: (state, { payload }) => {
      state.isAuth = payload
    },

    setPersonal: (state, { payload }) => {
      state.teacher.user_firstname = payload.first_name
      state.teacher.user_lastname = payload.last_name
      state.teacher.user_accent = payload.accent
      state.teacher.user_from = payload.from
      state.teacher.user_gender = payload.gender ? (payload.gender === 1 ? 'man' : 'woman') : 'none'
      state.teacher.user_current_location = payload.living
      state.teacher.user_displayname = payload.number
      state.teacher.user_birthday = payload.birthday
      state.teacher.user_photo = payload.file
      if (payload.birthday) {
        state.teacher.birthday = +new Date(payload.birthday.$d / 1000)
      }
    },

    setProfile: (state, { payload }) => {
      state.teacher.about = payload.about
      state.teacher.me = payload.me
    },

    setEducation: (state, { payload }) => {
      state.teacher.education = payload
    },

    setExprience: (state, { payload }) => {
      state.teacher.exprience = payload
    },
    setCertificates: (state, { payload }) => {
      state.teacher.certificates = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.errorMessage = action.payload.errorMessage
        state.loading = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.errorMessage = action.payload.errorMessage
        state.loading = false
      })
      .addCase(userResgister.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userResgister.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(userLogin.fulfilled, async (state, { payload }) => {
        console.log(payload)
        state.user = payload
      })
  },
})

export const selectUser = (state) => state.auth.user

export const authSelector = (state) => state.auth

export const {
  setLoading,
  setId,
  logout,
  setAuth,
  setType,
  setToken,
  setLogin,
  setPersonal,
  setProfile,
  setEducation,
  setExprience,
  setCertificates,
} = authSlice.actions

export default authSlice.reducer
