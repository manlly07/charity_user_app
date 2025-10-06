import useAuth from '@/hooks/useAuth'
import { RootState } from '@/stores/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Admin, App, Auth, Back, Blank, Organization, Profile } from '../layout'

type LayoutType = 'auth' | 'app'

type Props = {
  title: string
  layout: LayoutType
  display: React.ReactNode
  is_public: boolean
}
const View = (props: Props) => {
  const layouts = {
    auth: Auth,
    app: App,
    blank: Blank,
    back: Back,
    profile: Profile,
    organization: Organization,
    admin: Admin
  }
  let Layout = layouts[props.layout] || layouts.auth
  document.title = props.title

  useAuth(props?.is_public)

  const { user } = useSelector((state: RootState) => state.auth)

  // check if path include admin, and user.role == ADMIN, CONTINUE, else path include admin, user.role === USER => NAVIGATE '/'

  if (!props.display) return null

  const navigate = useNavigate()

  useEffect(() => {
    const path = window.location.pathname

    if (user?.role === 'ADMIN') {
      // Nếu không phải path admin, login, register => redirect về /admin
      if (!path.includes('admin') && !path.includes('login') && !path.includes('register')) {
        navigate('/admin')
      }
    } else {
      // Nếu là user thường mà vào path admin => redirect về /
      if (path.includes('admin')) {
        navigate('/')
      }
    }
  }, [user, navigate])

  return (
    <>
      <Layout>{props.display}</Layout>
    </>
  )
}

export default View
