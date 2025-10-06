import { useMultipleImageUpload } from '@/hooks'
import axiosInstance from '@/lib/api'
import { RootState } from '@/stores/store'
import { AccountSchema } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'
import InputCustom from '../Input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import ImageUpload from '../upload'

const AccountForm = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [image, setImage] = useState(user?.pic)

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      fullName: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.contact || '',
      image: new File([''], 'filename')
    }
  })

  useEffect(() => {
    setImage(user?.pic || '')
    form.reset({
      fullName: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.contact || '',
      image: new File([''], 'filename')
    })
  }, [user])

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    // required: ['image'], // profileImage là bắt buộc
    form // Truyền form instance để tự động sync
  })

  const onSubmit = async (data: z.infer<typeof AccountSchema>) => {
    const formData = new FormData()

    // gói object data thành JSON để gửi qua field "data"
    const payload = {
      email: data.email,
      fullName: data.fullName,
      contact: data.phoneNumber
    }

    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    // lấy file ảnh từ input, không dùng path string
    if (data.image instanceof File && data.image.size > 0) {
      formData.append('pic', data.image)
    }

    const res = await axiosInstance.put(`/profile/${user!.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (res.status === 200) {
      toast.success('Profile updated successfully!')
    }
  }
  return (
    <div className="shadow rounded-lg p-8 space-y-6">
      <p className="text-xl font-medium">Edit Personal Information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-9">
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
          {image ? (
            <div className="relative">
              <span
                className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow"
                onClick={() => {
                  setImage('')
                  form.setValue('image', new File([''], 'filename'))
                }}
              >
                <X />
              </span>
              <img
                src={image}
                alt="Profile"
                className="w-[276px] h-[300px] object-cover rounded-lg"
              ></img>
            </div>
          ) : (
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
          )}
        </form>
      </Form>
    </div>
  )
}

export default AccountForm
