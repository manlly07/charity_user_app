import { AuthService } from '@/services'
import { User } from '@/types/auth.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export interface TAuthState {
  error: any
  success: any
  isLoading: boolean
  user: any | User
}
const initialState: TAuthState = {
  error: null,
  success: null,
  isLoading: false,
  user: null
}

export const login = createAsyncThunk('LOGIN', AuthService.login)
export const register = createAsyncThunk('REGISTER', AuthService.register)
export const authenticated = createAsyncThunk('AUTHENTICATED', AuthService.authenticated)
const getUser = (): User | null => {
  const user = Cookies.get('user')
  return user ? (JSON.parse(user) as User) : null
}
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    user: getUser()
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.success = null
      state.error = null
      Cookies.remove('user')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      console.log(action)
      state.isLoading = false
    }),
      builder.addCase(login.pending, (state) => {
        state.isLoading = true
      })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      Cookies.set('user', JSON.stringify(action.payload))
    })
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false
    }),
      builder.addCase(register.pending, (state) => {
        state.isLoading = true
      })
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      Cookies.set('user', JSON.stringify(action.payload))
    })
    builder.addCase(authenticated.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})
export const { logout } = authSlice.actions
export default authSlice.reducer
