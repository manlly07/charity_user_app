import { Badge } from '@/components/ui/badge'
import { RequestStatus } from '@/enum'
import useOrganization from '@/hooks/useOrganization'
import { cn } from '@/lib/utils'
import { RequestService } from '@/services'
import { RootState } from '@/stores/store'
import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons'
import { ClockIcon } from 'lucide-react'
import moment from 'moment'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const DESCRIPTIONS = [
  {
    title: 'Under Review',
    description: 'Your application is currently under review by our team.',
    status: RequestStatus.PENDING
  },
  {
    title: 'Application Approved',
    description: 'Congratulations! Your application has been approved.',
    status: RequestStatus.APPROVED
  },
  {
    title: 'Application Rejected',
    description: 'We’re sorry to inform you that your application was rejected.',
    status: RequestStatus.REJECTED
  }
]

const RequestOrganization = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const { organization, error } = useOrganization(user!.id)
  if (error) {
    return <Navigate to={'/request-organize'} />
  }

  const status = useMemo(() => {
    if (!organization) return RequestStatus.PENDING.toUpperCase()
    return organization?.status
  }, [organization])
  console.log(organization)
  return (
    <div className="max-w-[1440px] w-full m-auto px-12 py-20 space-y-8">
      <button onClick={() => RequestService.updateStatus(user!.id, RequestStatus.APPROVED)}>
        Submit
      </button>
      <p className="text-3xl font-bold">Application Status</p>
      <div className="grid grid-cols-[1fr_470px] gap-8">
        <div className="border border-border rounded-lg p-8 space-y-8">
          <p className="text-2xl font-bold">Application Information</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-normal text-text-custom-color">Organization Name</p>
              <p className="text-base font-medium">{organization?.organizationName}</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Founder's Full Name</p>
              <p className="text-base font-medium">{organization?.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Email Address</p>
              <p className="text-base font-medium">{organization?.email}</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Phone Number</p>
              <p className="text-base font-medium">{organization?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">
                Reason for Creating the Organization
              </p>
              <p className="text-base p-4 bg-[#F9FAFB] rounded-lg">{organization?.denyReason}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-bold">Uploaded Documents</p>
            <div className="space-y-1">
              {organization?.logo && (
                <>
                  <p className="text-sm font-normal text-text-custom-color">Organization Logo</p>
                  <img
                    src={organization?.logo}
                    className="object-cover rounded w-[120px] h-[120px]"
                  />
                </>
              )}
            </div>
            <div className="space-y-1">
              {organization?.certificate && (
                <>
                  <p className="text-sm font-normal text-text-custom-color">Certificate</p>
                  <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileTextIcon width={24} height={24} />
                      <div>
                        <p className="text-base font-medium">Organization_Certificate.pdf</p>
                        <p className="text-sm text-[#6B7280]">Organization_Certificate.pdf</p>
                      </div>
                    </div>
                    <div>
                      <DownloadIcon width={20} height={20} className="text-primary-custom-color" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-8 space-y-6 h-fit">
            <p className="text-2xl font-bold">Current Status</p>
            <Badge
              variant="secondary"
              className={cn('text-base px-6', {
                'bg-green-500/10 text-green-500': status === RequestStatus.APPROVED.toUpperCase(),
                'bg-yellow-500/10 text-yellow-500': status === RequestStatus.PENDING.toUpperCase(),
                'bg-red-500/10 text-red-500': status === RequestStatus.REJECTED.toUpperCase()
              })}
            >
              <ClockIcon className="mr-2" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <div className="text-text-custom-color text-sm">
              Last updated: {moment(organization?.updatedAt).format('MMMM D, YYYY, h:mm A')}
            </div>
            <div className="space-y-4">
              {DESCRIPTIONS.filter((item, index) => index === 0 || item.status === status).map(
                (item, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <div className="self-stretch flex">
                      <span
                        className={cn('block w-2.5 h-2.5 rounded-full', {
                          'bg-green-500/50': status === RequestStatus.APPROVED.toUpperCase(),
                          'bg-red-500/50': status === RequestStatus.REJECTED.toUpperCase(),
                          'bg-yellow-500/50': status === RequestStatus.PENDING.toUpperCase()
                        })}
                      ></span>
                      <span
                        className={cn(
                          'block w-1 rounded-full h-[calc(100%-10px)] mt-auto -translate-x-[7px]',
                          {
                            'bg-green-500/50': status === RequestStatus.APPROVED.toUpperCase(),
                            'bg-red-500/50': status === RequestStatus.REJECTED.toUpperCase(),
                            'bg-yellow-500/50': status === RequestStatus.PENDING.toUpperCase()
                          }
                        )}
                      ></span>
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-text-custom-color text-base">{item.description}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="border border-border rounded-lg p-8 space-y-1 h-fit bg-[#F9FAFB]">
            <p className="text-base font-bold">Need Help?</p>
            <p className="text-sm text-text-secondary">
              If you have any questions about your application, our support team is here to help.
            </p>
            <p className="text-sm font-medium text-primary-custom-color">Contact Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestOrganization
