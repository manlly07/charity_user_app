import { useMultipleImageUpload } from '@/hooks'
import { AccountSchema } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import InputCustom from '../Input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import ImageUpload from '../upload'

const AccountForm = () => {
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      image: new File([''], 'filename')
    }
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['image'], // profileImage là bắt buộc
    form // Truyền form instance để tự động sync
  })
  return (
    <div className="shadow rounded-lg p-8 space-y-6">
      <p className="text-xl font-medium">Edit Personal Information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className=" flex gap-9">
          <div className="space-y-6 flex-1">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <InputCustom type="email" placeholder="Enter your email" {...field} />
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
                    <InputCustom type="text" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={'lg'}
              className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-fit shadow-lg shadow-primary-custom-color/20"
            >
              Save Changes
            </Button>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="flex flex-col gap-3">
                <div className="w-[276px] h-[300px] rounded-lg border border-dotted">
                  <FormControl>
                    <ImageUpload
                      onImageChange={handleImageChange('image')}
                      onImagePreviewChange={handlePreviewChange('image')}
                      onImageRemove={handleImageRemove('image')}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default AccountForm
