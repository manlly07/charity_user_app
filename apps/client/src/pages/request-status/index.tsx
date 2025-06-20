import { Event1 } from '@/assets'
import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons'

const RequestOrganization = () => {
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
          <div className="border border-border rounded-lg p-8 space-y-8 h-fit">
            <p className="text-2xl font-bold">Current Status</p>
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
