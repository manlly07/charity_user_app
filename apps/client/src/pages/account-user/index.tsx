import DashboadService from '@/services/dashboard.service'
import { RootState } from '@/stores/store'
import {
  BackpackIcon,
  CheckCircledIcon,
  ClockIcon,
  HeartIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { data: info } = useSWR(user?.organizationId ? ['/dashboard/user', user.id] : null, () =>
    DashboadService.getDashboardInfoUser(user!.id, user!.organizationId)
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Account Information</p>
          <p className="text-base text-text-custom-color">Manage your personal information</p>
        </div>
        {/* <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
          <Pencil1Icon />
          <span>Edit Profile</span>
        </Button> */}
      </div>
      <div className="shadow rounded-lg p-8 grid grid-cols-2  gap-x-8 gap-y-6">
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Full Name</p>
          <p className="text-base font-medium">{user?.username}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Phone Number</p>
          <p className="text-base font-medium">{user?.contact || '-'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Email Address</p>
          <p className="text-base font-medium">{user?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Total Donations</p>
            <p className="text-2xl font-semibold">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(parseFloat(info?.totalDonated as string) || 0)}
            </p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <BackpackIcon width={16} height={16} />
          </div>
        </div>
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Total Event</p>
            <p className="text-2xl font-semibold">{info?.charityJoinedCount} events</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <ClockIcon width={16} height={16} />
          </div>
        </div>
        <div className="p-6 shadow rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">Active Projects</p>
            <p className="text-2xl font-semibold">{info?.charityCreatedCount} projects</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
            <HeartIcon width={16} height={16} />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-xl font-semibold">Recent Activity</div>
        <div className="[&>div]:border-b [&>div]:border-border [&>div]:p-4 shadow rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
              <ClockIcon width={16} height={16} />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium">Donated to Local Food Bank</p>
              <p className="text-sm text-text-secondary">Today at 2:30 PM</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">$50.00</p>
              <p className="flex items-center gap-1 text-primary-custom-color text-sm">
                <CheckCircledIcon width={16} height={16} />
                <span>Complete</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
              <HeartIcon width={16} height={16} />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium">Volunteered at Animal Shelter</p>
              <p className="text-sm text-text-secondary">Yesterday at 10:00 AM</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">4 hours</p>
              <p className="flex items-center gap-1 text-primary-custom-color text-sm">
                <CheckCircledIcon width={16} height={16} />
                <span>Complete</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom-color/10 text-primary-custom-color">
              <StarIcon width={16} height={16} />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium">Earned Volunteer Badge</p>
              <p className="text-sm text-text-secondary">2 days ago</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">Animal Care</p>
              <p className="flex items-center gap-1 text-primary-custom-color text-sm">
                <CheckCircledIcon width={16} height={16} />
                <span>Awarded</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
