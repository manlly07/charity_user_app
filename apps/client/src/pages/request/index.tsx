import { Banner4 } from '@/assets'
import { InputCustom } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/upload'
import { useMultipleImageUpload } from '@/hooks'
import useOrganization from '@/hooks/useOrganization'
import { RequestService } from '@/services'
import { RootState } from '@/stores/store'
import { OrganizationFormData, OrganizationSchema } from '@/types/organization.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const RequestOrganization = () => {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(OrganizationSchema)
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['organizationLogo', 'certificate'], // profileImage là bắt buộc
    form // Truyền form instance để tự động sync
  })
  const { user } = useSelector((state: RootState) => state.auth)
  const { organization } = useOrganization(user!.id)
  const navigate = useNavigate()

  useEffect(() => {
    if (organization) navigate('/request-organize/status')
  }, [organization])

  const onSubmit = async (data: OrganizationFormData) => {
    const res = await RequestService.create(data, user!.id)
    if (res) {
      navigate('/request-organize/success')
      return
    }
  }

  return (
    <>
      <div className="flex">
        <div className="flex-1 flex flex-col justify-center morphing-green space-y-4 pl-16">
          <p className="text-white text-5xl font-bold max-w-[452px]">
            Want to become an Organization?
          </p>
          <p className="text-xl font-normal text-text-custom-color">
            Join our community of changemakers and make a bigger impact
          </p>
          <p className="text-sm font-normal text-text-custom-color max-w-[544px]">
            Transform your passion for helping others into organized action. Get access to powerful
            tools, resources, and a network of like-minded organizations.
          </p>
        </div>
        <div className="relative flex-1">
          <div className="image w-full h-[400px]">
            <img src={Banner4} alt="banner" className="w-full h-full object-cover" />
            <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
          </div>
        </div>
      </div>
      <div className="max-w-[700px] my-16 w-full m-auto p-12 space-y-8 shadow rounded-lg">
        <p className="font-bold text-3xl">Organization Application</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <InputCustom
                      type="text"
                      placeholder="Enter your organization name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <InputCustom type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Creating This Organization</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your organization's mission and goals... This will be displayed to users when they visit your organization's information"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizationLogo"
              render={() => (
                <FormItem>
                  <FormLabel>Organization Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      className="border rounded-lg border-dashed p-6"
                      onImageChange={handleImageChange('organizationLogo')}
                      onImagePreviewChange={handlePreviewChange('organizationLogo')}
                      onImageRemove={handleImageRemove('organizationLogo')}
                      placeholder="Select File"
                    >
                      <div className="space-y-1 flex flex-col items-center">
                        <UploadIcon width={30} height={30} />
                        <p className="text-text-secondary text-base">
                          Drop your logo here or browse
                        </p>
                        <p className="text-text-custom-color text-sm">
                          Supported formats: PDF, PNG, JPG (max. 10MB)
                        </p>
                      </div>
                    </ImageUpload>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificate"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Certificate</FormLabel>
                  <FormControl>
                    <ImageUpload
                      className="border rounded-lg border-dashed p-6"
                      onImageChange={handleImageChange('certificate')}
                      onImagePreviewChange={handlePreviewChange('certificate')}
                      onImageRemove={handleImageRemove('certificate')}
                      placeholder="Select File"
                    >
                      <div className="space-y-1 flex flex-col items-center">
                        <UploadIcon width={30} height={30} />
                        <p className="text-text-secondary text-base">
                          Drop your certificate here or browse
                        </p>
                        <p className="text-text-custom-color text-sm">
                          Supported formats: PNG, JPG (max. 10MB)
                        </p>
                      </div>
                    </ImageUpload>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={'lg'}
              className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-full shadow-lg shadow-primary-custom-color/20"
            >
              Sign up
            </Button>
          </form>
        </Form>
        <p className="text-center text-text-custom-color">
          Our team will review your application within 2-3 business days{' '}
        </p>
      </div>
    </>
  )
}

export default RequestOrganization
