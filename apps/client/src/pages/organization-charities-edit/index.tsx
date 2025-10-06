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
import CharityService, { CharityEventRequest } from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { charityFormSchema } from '@/types/charity.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { z } from 'zod'

type Form = z.infer<typeof charityFormSchema>

const CharitieCreate = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) return <Navigate to={'/login'} />
  const { data, error } = useSWR('/charity/detail', async () => {
    const res = await axiosInstance.get(`/events/charity/${id}`)
    return res.data
  })

  const form = useForm<Form>({
    resolver: zodResolver(charityFormSchema),
    defaultValues: {
      charityName: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      destination: '',
      description: '',
      todo: '',
      requirement: '',
      numVolunteerRequire: ''
    }
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['pic'],
    form
  })

  useEffect(() => {
    if (data) {
      form.setValue('charityName', data?.name)
      form.setValue('dateStart', new Date(data?.dateStart))
      form.setValue('dateEnd', new Date(data?.dateEnd))
      form.setValue('destination', data?.destination)
      form.setValue('description', data?.description)
      form.setValue('todo', data?.todo)
      form.setValue('requirement', data?.requirement)
      form.setValue('numVolunteerRequire', data?.numVolunteerRequire.toString())
    }
  }, [data])

  const onSubmit = async (data: Form) => {
    const newData: CharityEventRequest = {
      organizationId: user?.organizationId ?? 0,
      charityName: data.charityName,
      dateStart: data?.dateStart,
      dateEnd: data?.dateEnd,
      numVolunteerRequire: parseInt(data?.numVolunteerRequire),
      description: data?.description,
      destination: data?.destination,
      todo: data?.todo,
      requirement: data?.requirement,
      pic: data?.pic
    }

    const res = await CharityService.update(id, newData)
    if (res) {
      toast.success('Update thành công hoạt động từ thiện')
      navigate('/organization/charities')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Edit New Charity</p>
          <p className="text-base text-text-custom-color">
            Enter the necessary details to update a charity project.
          </p>
        </div>
      </div>
      <div className="p-6 shadow mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="charityName"
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
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter event destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To-do</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the volunteer event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirement</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the volunteer event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numVolunteerRequire"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Volunteers Needed</FormLabel>
                  <FormControl>
                    <InputCustom placeholder="Enter number of volunteers needed" {...field} />
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
