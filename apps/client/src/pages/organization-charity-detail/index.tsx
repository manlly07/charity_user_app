import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import {
  CheckCircledIcon,
  ClockIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  RocketIcon
} from '@radix-ui/react-icons'
import { useNavigate, useParams } from 'react-router'
import TableCharityUsers from './table'

const CharityDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Volunteer Registrations - Beach Cleanup 2024</p>
          <p className="text-base text-text-custom-color">
            List of users who have signed up for this event
          </p>
        </div>
      </div>
      <div className="p-6 shadow space-y-2">
        <p className="text-2xl font-bold">Annual Beach Cleanup 2024</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-text-custom-color">
            <RocketIcon className="text-primary-custom-color" /> Santa Monica Beach, CA
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <ClockIcon className="text-primary-custom-color" /> March 15, 2024 • 9:00 AM - 2:00 PM
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <PersonIcon className="text-primary-custom-color" /> 32 Registered Volunteers
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <CheckCircledIcon className="text-primary-custom-color" /> Registration Open
          </div>
        </div>
        <p className="text-text-custom-color text-sm">
          Join us for our annual beach cleanup initiative to preserve our coastal environment.
        </p>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search volunteers by name or email" />
          <Button
            className="bg-primary-custom-color hover:bg-primary-custom-color"
            onClick={() => navigate(`/organization/charities/${id}/checkin`)}
          >
            <CheckCircledIcon />
            <span>Check in</span>
          </Button>
          <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
            <EnvelopeClosedIcon />
            <span>Sent Notification to Volunteer</span>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <TableCharityUsers />
      </div>
    </div>
  )
}

export default CharityDetail
