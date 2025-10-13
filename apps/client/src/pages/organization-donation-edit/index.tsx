import { DateTimePicker, InputCustom } from '@/components'
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
import axiosInstance from '@/lib/api'
import DonationService from '@/services/donation.service'
import { RootState } from '@/stores/store'
import { donationFormSchema } from '@/types/donation.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { z } from 'zod'

type Form = z.infer<typeof donationFormSchema>

const CharitieCreate = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const { id } = useParams<{ id: string }>()

  if (!id) return <Navigate to={'/login'} />
  const { data, error } = useSWR('/donations/detail', async () => {
    const res = await axiosInstance.get(`/events/donation/${id}`)
    return res.data
  })

  useEffect(() => {
    if (data) {
      console.log(data)
      form.setValue('title', data?.title)
      form.setValue('dateStart', new Date(data?.dateStart))
      form.setValue('dateEnd', new Date(data?.dateEnd))
      form.setValue('description', data?.description)
      form.setValue('moneyNeed', data?.moneyNeed)
      form.setValue('bankAccount', data?.bankAccount)
      // form.setValue('numVolunteerRequire', data?.numVolunteerRequire.toString())
    }
  }, [data])

  const form = useForm<Form>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      title: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      description: '',
      moneyNeed: '',
      bankAccount: '',
      qrcode: undefined
    }
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['pic'],
    form
  })

  const onSubmit = async (data: Form) => {
    const newData = {
      ...data,
      organizationId: user?.organizationId ? String(user.organizationId) : undefined
    }

    const res = await DonationService.create(newData)
    if (res) {
      toast.success('Tạo thành công hoạt động quyên góp')
      navigate('/organization/donations')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Update a Donation Campaign</p>
          <p className="text-base text-text-custom-color">
            Provide the details to update a donation campaign and start making a difference.
          </p>
        </div>
      </div>
      <div className="p-6 shadow mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter program name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => <DateTimePicker field={field} label="Start Date & Time" />}
            />
            <FormField
              control={form.control}
              name="dateEnd"
              render={({ field }) => <DateTimePicker field={field} label="End Date & Time" />}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the volunteer event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moneyNeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Money Need</FormLabel>
                  <FormControl>
                    <InputCustom placeholder="Enter Money Need" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account</FormLabel>
                  <FormControl>
                    <InputCustom placeholder="Enter Bank Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pic"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Banner Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      className="border rounded-lg border-dashed p-6"
                      onImageChange={handleImageChange('pic')}
                      onImagePreviewChange={handlePreviewChange('pic')}
                      onImageRemove={handleImageRemove('pic')}
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
            <Button
              type="submit"
              size={'lg'}
              className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-full shadow-lg shadow-primary-custom-color/20"
            >
              Create Event
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CharitieCreate
