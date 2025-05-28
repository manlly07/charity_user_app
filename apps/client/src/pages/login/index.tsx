import { BgLogin } from '@/assets'

type Props = {}
const Login = (props: Props) => {
  return (
    <div className="w-screen h-screen relative">
      <img className="top-0 left-0 right-0 bottom-0 absolute object-contain" src={BgLogin} alt="" />
    </div>
  )
}

export default Login
