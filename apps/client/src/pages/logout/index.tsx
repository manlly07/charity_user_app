// src/pages/LogoutPage.tsx

import { logout } from '@/stores/slices/auth.slice' // giả sử bạn có action logout()
import { AppDispatch } from '@/stores/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const LogoutPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout()) // Thực hiện xoá user/token khỏi store (và có thể API logout nếu cần)
      navigate('/login')
    }

    handleLogout()
  }, [dispatch, navigate])

  return <p>Logging out...</p>
}

export default LogoutPage
