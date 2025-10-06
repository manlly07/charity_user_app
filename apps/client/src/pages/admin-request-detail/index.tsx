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
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xl font-semibold">Certificate</p>
          <div>
            {!data?.certificate && (
              <p className="text-sm text-text-secondary">No certificate available.</p>
            )}
            {data?.certificate && (
              <img
                src={data?.certificate}
                alt={data?.organizationName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold">Logo</p>
          <div>
            {!data?.logo && <p className="text-sm text-text-secondary">No logo available.</p>}
            {data?.logo && (
              <img
                src={data?.logo}
                alt={data?.organizationName}
                className="w-ful h-20 rounded object-cover block "
              />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Reason for Request</p>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-base font-medium">{data?.denyReason || '-'}</p>
        </div>
      </div>
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
