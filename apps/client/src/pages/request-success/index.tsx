import { IconCHeckV2 } from '@/assets'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon, HomeIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Link, useNavigate } from 'react-router'

const RequestOrganization = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto my-[120px] w-[640px] shadow rounded-lg p-12 relativ space-y-6 text-center">
      <img src={IconCHeckV2} width={80} height={80} className="block mx-auto" />
      <p className="text-4xl font-bold leading-12">Your Application Has Been Submitted!</p>
      <p className="text-lg font-normal text-[#374151]">
        Thank you for your interest in becoming an Organization.
      </p>
      <p className="text-lg font-normal text-[#374151]">
        Our team will review your application shortly. You will receive a notification once a
        decision has been made.
      </p>
      <p className="text-lg font-normal text-[#374151] flex items-center gap-2 justify-center">
        <QuestionMarkCircledIcon />
        Estimated review time: Up to 3 business days
      </p>
      <div className="space-y-4">
        <Button
          className="bg-primary-custom-color text-white hover:bg-primary-custom-color w-full"
          size={'lg'}
          onClick={() => navigate('/')}
        >
          <HomeIcon /> Return to Dashboard
        </Button>
        <Link
          to={'/request-organize/status'}
          className="flex items-center justify-center gap-2 font-medium text-primary-custom-color"
        >
          View Application Status <ChevronRightIcon />
        </Link>
      </div>
    </div>
  )
}

export default RequestOrganization
