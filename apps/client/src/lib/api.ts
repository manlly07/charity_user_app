// api/axiosInstance.ts
import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: 20000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ✅ Request Interceptor: gắn token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const user = Cookies.get('user')
    let token
    if (user) {
      try {
        const userObj = JSON.parse(user)
        token = userObj?.accessToken
      } catch (e) {
        token = undefined
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
