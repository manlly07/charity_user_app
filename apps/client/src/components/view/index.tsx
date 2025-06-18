import { App, Auth, Back, Blank, Profile } from '../layout'

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
    profile: Profile
  }
  let Layout = layouts[props.layout] || layouts.auth
  document.title = props.title

  if (!props.display) return null

  return (
    <>
      <Layout>{props.display}</Layout>
    </>
  )
}

export default View
