import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import OrganizationService from '@/services/organization.service'
import dayjs from 'dayjs'
import {
  Calendar,
  ChevronLeft,
  HandHeart,
  MapPin,
  Settings2,
  UserIcon,
  UsersIcon
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'

const OrganizationDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data } = useSWR('/admin/organization/' + id, () =>
    OrganizationService.getOrganizationById(id!)
  )

  const handleUpdateOrganization = async () => {
    await OrganizationService.deleteOrganization(id!)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
          Back
        </div>
        <div className="text-2xl font-bold">Organization Detail</div>
        {/* <div className="flex items-center gap-2">
          <Button
            className="text-red-400 border-red-200 px-6"
            variant={'outline'}
            size={'sm'}
            onClick={() => handleUpdateOrganization()}
          >
            Delete
          </Button>
        </div> */}
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Basic Information</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">OrganizationId</p>
            <p className="text-base font-medium">{data?.id ? `ORG - ${data?.id}` : '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Owner Name</p>
            <p className="text-base font-medium">{data?.ownerName || '-'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-6">
        <div>
          <img
            src={data?.logo}
            alt={data?.organizationName}
            className="w-20 h-20 rounded object-cover block "
          />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold">{data?.organizationName}</p>
          <p className="flex gap-2 text-sm items-center">
            <MapPin className="text-sm" size={14} /> Hà Nội, Việt Nam
          </p>
          <p className="text-sm text-text-secondary">{data?.description || '-'}</p>
          <div className="grid grid-cols-3 gap-12 mt-4">
            <div className="col-span-1 flex gap-2 items-center p-4">
              <UsersIcon className="text-green-500" size={14} />
              <div className="ml-3">
                <p className="font-semibold text-xl">{data?.totalVolunteersParticipated}</p>
                <p className="font-normal text-sm">Total Volunteers</p>
              </div>
            </div>
            <div className="col-span-1 flex gap-2 items-center p-4">
              <HandHeart className="text-green-500" size={14} />
              <div className="ml-3">
                <p className="font-semibold text-xl">{data?.totalDonationAmount}</p>
                <p className="font-normal text-sm">Impact Made</p>
              </div>
            </div>
            <div className="col-span-1 flex gap-2 items-center p-4">
              <Settings2 className="text-green-500" size={14} />
              <div className="ml-3">
                <p className="font-semibold text-xl">
                  {data?.totalCharityEvents + data?.totalDonationEvents}
                </p>
                <p className="font-normal text-sm">Active Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Charity Events</p>
        <div className="grid grid-cols-3 gap-6">
          {data?.charityEvents?.length === 0 && <p>No charity events yet.</p>}
          {data?.charityEvents?.map((charity: any) => {
            return (
              <div className="space-y-2 shadow p-4 rounded" key={charity?.id}>
                <p className="text-xl font-semibold text-gray-500">{charity?.charityName}</p>
                <p className="text-sm font-normal">
                  <Calendar className="inline-block mr-2" size={14} />
                  {`${dayjs(charity?.dateStart).format('MMM D, YYYY')} - ${dayjs(
                    charity?.dateEnd
                  ).format('MMM D, YYYY')}`}
                </p>
                <p className="text-sm text-text-secondary flex items-start">
                  <MapPin className="inline-block mr-2" size={14} />
                  <span className="block max-w-[150px]">{charity?.destination || '-'}</span>
                </p>
                <p className="text-sm text-text-secondary flex items-start">
                  <UserIcon className="inline-block mr-2" size={14} />
                  <span className="block max-w-[150px]">{charity?.numVolunteerActual || '-'}</span>
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={'secondary'}
                    className={cn('text-xs', {
                      'bg-green-500/10 text-green-500': charity?.eventStatus === 'ACTIVE',
                      'bg-blue-500/10 text-blue-500': charity?.eventStatus === 'COMPLETED',
                      'bg-yellow-500/10 text-yellow-500': charity?.eventStatus === 'PENDING',
                      'bg-red-500/10 text-red-500': charity?.eventStatus === 'CANCELLED'
                    })}
                  >
                    {String(charity?.eventStatus).charAt(0).toUpperCase() +
                      String(charity?.eventStatus).slice(1)}
                  </Badge>
                  <span
                    className="text-sm text-primary-custom-color cursor-pointer"
                    onClick={() => navigate('/admin/charities/' + charity?.id)}
                  >
                    View Details
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Active Donation Campaigns</p>
        <div className="space-y-2 grid grid-cols-2 gap-6">
          {data?.donationEvents?.length === 0 && <p>No events participated yet.</p>}
          {data?.donationEvents?.map((event: any) => {
            return (
              <div className="col-span-1 p-4 shadow rounded space-y-2" key={event?.id}>
                <p className="font-medium">{event?.donationName}</p>
                <div className="text-sm text-text-secondary flex items-center justify-between gap-4 my-2">
                  <p>Raised: ${event?.actualAmount}</p>
                  <p>Target: ${event?.targetAmount}</p>
                </div>
                <Progress
                  value={
                    event?.actualAmount
                      ? ((event?.actualAmount ?? 0) / event.targetAmount) * 100
                      : 0
                  }
                  color="grass"
                />
                <div className="flex items-center justify-between">
                  <Badge
                    variant={'secondary'}
                    className={cn('text-xs', {
                      'bg-green-500/10 text-green-500': event?.eventStatus === 'ACTIVE',
                      'bg-blue-500/10 text-blue-500': event?.eventStatus === 'COMPLETED',
                      'bg-yellow-500/10 text-yellow-500': event?.eventStatus === 'PENDING',
                      'bg-red-500/10 text-red-500': event?.eventStatus === 'CANCELLED'
                    })}
                  >
                    {String(event?.eventStatus).charAt(0).toUpperCase() +
                      String(event?.eventStatus).slice(1)}
                  </Badge>
                  <span
                    className="text-sm text-primary-custom-color cursor-pointer"
                    onClick={() => navigate('/admin/donations/' + event?.id)}
                  >
                    View Details
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrganizationDetail
