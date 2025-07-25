import useAuth from '@/hooks/useAuth'
import { App, Auth, Back, Blank, Organization, Profile } from '../layout'

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
    organization: Organization
  }
  let Layout = layouts[props.layout] || layouts.auth
  document.title = props.title

  useAuth(props?.is_public)

  if (!props.display) return null

  return (
    <>
      <Layout>{props.display}</Layout>
    </>
  )
}

export default View
