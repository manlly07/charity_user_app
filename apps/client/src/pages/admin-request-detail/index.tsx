import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RequestStatus } from '@/enum'
import { cn } from '@/lib/utils'
import RequestAminService from '@/services/request.admin.service'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'

const OrganizationDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, mutate } = useSWR('/admin/organization/' + id, () =>
    RequestAminService.getRequestById(id!)
  )

  const handleUpdateRequest = async (id: number, status: RequestStatus) => {
    await RequestAminService.updateStatusRequest(id!, { status })
    mutate()
  }

  console.log(data)

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
          Back
        </div>
        <div className="text-2xl font-bold">Request Details</div>
        <div className="flex items-center gap-2">
          <Badge
            variant={'secondary'}
            className={cn('text-xs', {
              'bg-green-500/10 text-green-500': data?.status === RequestStatus.APPROVED,
              'bg-yellow-500/10 text-yellow-500': data?.status === RequestStatus.PENDING,
              'bg-red-500/10 text-red-500': data?.status === RequestStatus.REJECTED
            })}
          >
            {String(data?.status).charAt(0).toUpperCase() + String(data?.status).slice(1)}
          </Badge>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Basic Information</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">User Id</p>
            <p className="text-base font-medium">
              {data?.volunteerId ? `PRG - ${data?.volunteerId}` : '-'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Request Types</p>
            <p className="text-base font-medium">{data?.requestType || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-base font-medium">{data?.organizationName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Founder Name</p>
            <p className="text-base font-medium">{data?.volunteerFullName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-base font-medium">{data?.volunteerEmail || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-base font-medium">{data?.volunteerContact || '-'}</p>
          </div>
          {data?.requestType === 'CHARITY_REGISTRATION' && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Program Name</p>
                <p className="text-base font-medium">{data?.charityEventName || '-'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Localtion</p>
                <p className="text-base font-medium">{data?.destination || '-'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Number of Volunteer Need</p>
                <p className="text-base font-medium">{data?.numberOfVolunteers || '-'}</p>
              </div>
            </>
          )}
          {data?.requestType === 'DONATION_REGISTRATION' && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Money need</p>
                <p className="text-base font-medium">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(parseFloat(data?.moneyNeed as string) || 0)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Program Name</p>
                <p className="text-base font-medium">{data?.donationEventName || '-'}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xl font-semibold">Certificate</p>
          <div>
            {!data?.organizationCertificate && (
              <p className="text-sm text-text-secondary">No certificate available.</p>
            )}
            {data?.organizationCertificate && (
              <img
                src={data?.organizationCertificate}
                alt={data?.organizationName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold">Logo</p>
          <div>
            {!data?.organizationLogo && (
              <p className="text-sm text-text-secondary">No logo available.</p>
            )}
            {data?.organizationLogo && (
              <img
                src={data?.organizationLogo}
                alt={data?.organizationName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </div>
      </div>
      {data?.requestType === 'CHARITY_REGISTRATION' && (
        <>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Description</p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-base font-medium">{data?.charityDescription || '-'}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">To do</p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-base font-medium">{data?.charityToDo || '-'}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Require</p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-base font-medium">{data?.charityRequire || '-'}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Banner Charity</p>
            {!data?.charityPic && <p className="text-sm text-text-secondary">No logo available.</p>}
            {data?.charityPic && (
              <img
                src={data?.organizationLogo}
                alt={data?.charityEventName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </>
      )}
      {data?.requestType === 'DONATION_REGISTRATION' && (
        <>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Description</p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-base font-medium">{data?.donationDescription || '-'}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Banner Donation</p>
            {!data?.donationPic && (
              <p className="text-sm text-text-secondary">No banner available.</p>
            )}
            {data?.donationPic && (
              <img
                src={data?.organizationLogo}
                alt={data?.donationEventName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </>
      )}
      {/* {(data?.requestType === 'CHARITY_EDITION' || data?.requestType === 'DONATION_EDITION') && (
        <>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Reason for Request</p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-base font-medium">{data?.editReason || '-'}</p>
            </div>
          </div>
        </>
      )} */}
      <div className="flex items-center gap-6">
        <Button
          className="bg-primary-custom-color"
          onClick={() => handleUpdateRequest(data?.id, RequestStatus.APPROVED)}
        >
          Approve Request
        </Button>
        <Button
          className="bg-red-500"
          onClick={() => handleUpdateRequest(data?.id, RequestStatus.REJECTED)}
        >
          Reject Request
        </Button>
      </div>
    </div>
  )
}

export default OrganizationDetail
