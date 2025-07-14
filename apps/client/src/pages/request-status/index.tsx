import { Event1 } from '@/assets'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons'
import { ClockIcon } from 'lucide-react'
import { useState } from 'react'

enum RequestStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

const DESCRIPTIONS = [
  {
    title: 'Under Review',
    description: 'Your application is currently under review by our team.',
    status: RequestStatus.Pending
  },
  {
    title: 'Application Approved',
    description: 'Congratulations! Your application has been approved.',
    status: RequestStatus.Approved
  },
  {
    title: 'Application Rejected',
    description: 'We’re sorry to inform you that your application was rejected.',
    status: RequestStatus.Rejected
  }
]

const RequestOrganization = () => {
  const [status] = useState<RequestStatus>(RequestStatus.Approved)

  return (
    <div className="max-w-[1440px] w-full m-auto px-12 py-20 space-y-8">
      <p className="text-3xl font-bold">Application Status</p>
      <div className="grid grid-cols-[1fr_470px] gap-8">
        <div className="border border-border rounded-lg p-8 space-y-8">
          <p className="text-2xl font-bold">Application Information</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-normal text-text-custom-color">Organization Name</p>
              <p className="text-base font-medium">Green Earth Initiative</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Founder's Full Name</p>
              <p className="text-base font-medium">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Email Address</p>
              <p className="text-base font-medium">sarah.johnson@greenearthorg.com</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">Phone Number</p>
              <p className="text-base font-medium">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm font-normal text-text-custom-color">
                Reason for Creating the Organization
              </p>
              <p className="text-base p-4 bg-[#F9FAFB] rounded-lg">
                Our mission is to create a sustainable future through community-driven environmental
                initiatives. We aim to educate and empower local communities about environmental
                conservation while implementing practical solutions for climate change mitigation.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-bold">Uploaded Documents</p>
            <div className="space-y-1">
              <p className="text-sm font-normal text-text-custom-color">Organization Logo</p>
              <img src={Event1} className="object-cover rounded w-[120px] h-[120px]" />
            </div>
            <div className="space-y-1">
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
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-8 space-y-6 h-fit">
            <p className="text-2xl font-bold">Current Status</p>
            <Badge
              variant="secondary"
              className={cn('text-base px-6', {
                'bg-green-500/10 text-green-500': status === RequestStatus.Approved,
                'bg-yellow-500/10 text-yellow-500': status === RequestStatus.Pending,
                'bg-red-500/10 text-red-500': status === RequestStatus.Rejected
              })}
            >
              <ClockIcon className="mr-2" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <div className="text-text-custom-color text-sm">
              Last updated: December 18, 2023, 2:30 PM
            </div>
            <div className="space-y-4">
              {DESCRIPTIONS.filter((item, index) => index === 0 || item.status === status).map(
                (item, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <div className="self-stretch flex">
                      <span
                        className={cn('block w-2.5 h-2.5 rounded-full', {
                          'bg-green-500/50': status === RequestStatus.Approved,
                          'bg-red-500/50': status === RequestStatus.Rejected,
                          'bg-yellow-500/50': status === RequestStatus.Pending
                        })}
                      ></span>
                      <span
                        className={cn(
                          'block w-1 rounded-full h-[calc(100%-10px)] mt-auto -translate-x-[7px]',
                          {
                            'bg-green-500/50': status === RequestStatus.Approved,
                            'bg-red-500/50': status === RequestStatus.Rejected,
                            'bg-yellow-500/50': status === RequestStatus.Pending
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
