import { IconCHeckV2 } from '@/assets'
import { Button } from '@/components/ui/button'
import { RocketIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router'

const RequestOrganizationApproved = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto my-[120px] w-[850px] shadow rounded-lg p-12 relativ space-y-6 text-center">
      <img src={IconCHeckV2} width={80} height={80} className="block mx-auto" />
      <p className="text-4xl font-bold leading-12">
        Congratulations! Your Application Has Been Approved
      </p>
      <p className="text-lg font-normal text-[#374151] mb-2">
        You are now officially an Organization on our platform.
      </p>
      <p className="text-base font-normal text-[#374151]">
        You can start creating volunteer programs and donation campaigns to make an impact.
      </p>
      <div className="space-y-4">
        <Button
          className="bg-primary-custom-color text-white hover:bg-primary-custom-color w-fit"
          size={'lg'}
          onClick={() => navigate('/organization/account')}
        >
          <RocketIcon /> Go to Organization Dashboard
        </Button>
      </div>
    </div>
  )
}

export default RequestOrganizationApproved
