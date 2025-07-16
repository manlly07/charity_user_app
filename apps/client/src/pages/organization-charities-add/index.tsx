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
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const charityFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  startDate: z.date({
    required_error: 'A date and time is required.'
  }),
  endDate: z.date({
    required_error: 'A date and time is required.'
  }),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  description: z.string().min(10, 'Description is too short'),
  todo: z.string().min(5, 'To-do is required'),
  require: z.string().min(5, 'Requirement is required'),
  numberOfVolunteers: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Must be a positive integer'
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'Image must be smaller than 5MB'
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Image must be JPEG, PNG, or WebP'
    })
})

type Form = z.infer<typeof charityFormSchema>

const CharitieCreate = () => {
  const form = useForm<Form>({
    resolver: zodResolver(charityFormSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      description: '',
      numberOfVolunteers: ''
    }
  })

  const { handleImageChange, handlePreviewChange, handleImageRemove } = useMultipleImageUpload({
    maxSize: 5000000, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required: ['image'],
    form
  })

  const onSubmit = (data: Form) => {
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Add New Charity</p>
          <p className="text-base text-text-custom-color">
            Enter the necessary details to register a new charity project.
          </p>
        </div>
      </div>
      <div className="p-6 shadow mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="startDate"
              render={({ field }) => <DateTimePicker field={field} label="Start Date & Time" />}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => <DateTimePicker field={field} label="End Date & Time" />}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter event location" {...field} />
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
                  <FormLabel>Location</FormLabel>
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
              name="require"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Require</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the volunteer event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfVolunteers"
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
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Banner Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      className="border rounded-lg border-dashed p-6"
                      onImageChange={handleImageChange('image')}
                      onImagePreviewChange={handlePreviewChange('image')}
                      onImageRemove={handleImageRemove('image')}
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
