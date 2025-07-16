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
import { zodResolver } from '@hookform/resolvers/zod'
import { SectionIcon, UploadIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const vietnamPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/

const organizationFormSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, 'Tên tổ chức phải có ít nhất 2 ký tự')
    .max(100, 'Tên tổ chức tối đa 100 ký tự'),

  founderFullName: z
    .string()
    .trim()
    .min(2, 'Tên người sáng lập phải có ít nhất 2 ký tự')
    .max(50, 'Tên người sáng lập tối đa 50 ký tự'),

  email: z.string().trim().email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam'),

  missionStatement: z.string().trim().min(10, 'Tầm nhìn và sứ mệnh quá ngắn'),

  organizationLogo: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Logo không được vượt quá 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Logo phải là file ảnh (JPEG, PNG, WebP)'
    )
    .optional()
})

type Form = z.infer<typeof organizationFormSchema>

const CharitieCreate = () => {
  const form = useForm<Form>({
    resolver: zodResolver(organizationFormSchema)
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['organizationLogo'],
    form
  })

  const onSubmit = (data: Form) => {
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Settings</p>
          <p className="text-base text-text-custom-color">
            Update your organization's profile and preferences.
          </p>
        </div>
      </div>
      <div className="p-6 shadow mb-6 space-y-6">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <SectionIcon className="text-primary-custom-color" />
          Organization Profile
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <InputCustom type="text" placeholder="Enter Organization Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="founderFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <InputCustom type="text" placeholder="Enter Representative Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <InputCustom type="text" placeholder="Enter Email Address" {...field} />
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
                      <InputCustom type="text" placeholder="Enter Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                          Drop your qrcode here or browse
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
              name="missionStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Banner Image</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your organization's mission statement"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={'lg'}
              className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-fit shadow-lg shadow-primary-custom-color/20 block ml-auto"
            >
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CharitieCreate
