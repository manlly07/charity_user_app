import axiosInstance from '@/lib/api'
import { RootState } from '@/stores/store'
import { PasswordSchema } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'
import InputCustom from '../Input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const PasswordForm = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      newPassword: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    // /{id}/password
    try {
      const response = await axiosInstance.put(`/profile/${user?.accountId}/password`, data)
      if (response.status === 200) {
        toast.success('Đổi mật khẩu thành công')
        form.reset()
      }
    } catch (error) {
      toast.error('Đổi mật khẩu thất bại, vui lòng thử lại')
    }
  }

  return (
    <div className="shadow rounded-lg p-8 space-y-6">
      <p className="text-xl font-medium">Change Password</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-9">
          <div className="space-y-6 flex-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <InputCustom type="password" placeholder="Enter current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <InputCustom type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <InputCustom type="password" placeholder="Confirm new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={'lg'}
              variant={'outline'}
              className="border-primary-custom-color text-primary-custom-color hover:text-primary-custom-color w-fit shadow-lg shadow-primary-custom-color/20"
            >
              Change Password
            </Button>
          </div>
          <div className="w-[276px]"></div>
        </form>
      </Form>
    </div>
  )
}

export default PasswordForm
