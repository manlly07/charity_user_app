import { ROLE } from '@/enum'
import axiosInstance from '@/lib/api'
import { LoginData, RegisterData } from '@/types/auth.type'

export default class AuthService {
  static async login(
    dto: LoginData,
    {
      rejectWithValue
    }: {
      rejectWithValue: any
    }
  ) {
    try {
      const res = await axiosInstance.post('/auth/signin', dto)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
  static async authenticated() {
    const res = await axiosInstance.get('/auth/authenticated', {
      withCredentials: true
    })
    return res.data
  }
  static async register(
    dto: RegisterData,
    {
      rejectWithValue
    }: {
      rejectWithValue: any
    }
  ) {
    try {
      const res = await axiosInstance.post('/auth/signup', {
        ...dto,
        role: ROLE.ROLE_USER
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
}
