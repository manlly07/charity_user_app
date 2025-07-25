import { authenticated } from '@/stores/slices/auth.slice'
import { AppDispatch, RootState } from '@/stores/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'

const useAuth = (is_public: boolean) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      if (is_public) return
      const res = await dispatch(authenticated())
      if (res.meta.requestStatus === 'rejected') {
        navigate('/login')
      }
    }
    checkAuth()
  }, [pathname, dispatch, navigate, is_public])

  useEffect(() => {
    if (is_public) return
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [isLoading, user, navigate, is_public])
}

export default useAuth
