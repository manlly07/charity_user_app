import DonationService from '@/services/donation.service'
import { RootState } from '@/stores/store'
import { BackpackIcon, ClockIcon, HeartIcon } from '@radix-ui/react-icons'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import TableOrganization from './table'

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const { data, error } = useSWR(
    user?.organizationId ? ['/dashboard/organization', user.organizationId] : null,
    () => DonationService.getInfoDashboard(user!.organizationId)
  )

  const info = useMemo(() => {
    if (error || !data) return null
    return data
  }, [data, error])
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Welcome back, Hope Foundation 👋</p>
          <p className="text-base text-text-custom-color">
            Manage your volunteer programs and donations easily
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Total Charity Event</p>
            <p className="text-2xl font-semibold">{info?.charityCount ?? 0} events</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <BackpackIcon width={16} height={16} />
          </div>
        </div>
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Total Donation Event</p>
            <p className="text-2xl font-semibold">{info?.charityCount ?? 0} events</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <ClockIcon width={16} height={16} />
          </div>
        </div>
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Total Events</p>
            <p className="text-2xl font-semibold">{info?.total ?? 0} events</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <HeartIcon width={16} height={16} />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-xl font-semibold shadow p-6 rounded">Recent Activity</div>
        <TableOrganization />
      </div>
    </div>
  )
}

export default Account
