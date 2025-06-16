import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router'

type Props = {
  children: React.ReactNode
}

const Back = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className="max-w-screen min-h-screen">
      <div
        className="max-w-[1440px] w-full m-auto flex items-center gap-2 text-primary-custom-color p-6 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <ArrowLeftIcon width={24} height={24} />
        <p className="text-lg font-medium">Back</p>
      </div>
      {props.children}
    </div>
  )
}

export default Back
