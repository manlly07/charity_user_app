import { BgLogin, IconApple, IconFacebook, IconGoogle } from '@/assets'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

const vietnamPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/
const FormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full Name phải có ít nhất 2 ký tự')
    .max(50, 'Full Name tối đa 50 ký tự'),

  email: z.string().trim().email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam'),

  password: z.string().trim().min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
})

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: ''
    }
  })

  return (
    <div className="w-full h-full relative flex">
      <div className="hidden md:block flex-1 w-full h-full">
        <img className="w-full h-full" src={BgLogin} alt="bglogin" />
      </div>
      <div className="login-form flex-1 flex items-center justify-center p-6">
        <div className="space-y-8 w-[440px]">
          <div className="space-y-3 text-center">
            <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">Create Account</h3>
            <p className="text-base text-[#4B5563]">Join our community of changemakers</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
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
                name="email"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputCustom type="password" placeholder="Enter your password" {...field} />
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
          <div className="flex items-center justify-center gap-2 px-1">
            <span className="border-[1px] flex-1"></span>
            <span>or continue with</span>
            <span className="border-[1px] flex-1"></span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              size="lg"
              className="flex-1 flex items-center justify-center border py-3 rounded-[12px] bg-transparent hover:bg-transparent hover:border-primary-custom-color cursor-pointer"
            >
              <img alt="google" src={IconGoogle} width={20} height={20} />
            </Button>
            <Button
              size="lg"
              className="flex-1 flex items-center justify-center border py-3 rounded-[12px] bg-transparent hover:bg-transparent hover:border-primary-custom-color cursor-pointer"
            >
              <img alt="facebook" src={IconFacebook} width={20} height={20} />
            </Button>
            <Button
              size="lg"
              className="flex-1 flex items-center justify-center border py-3 rounded-[12px] bg-transparent hover:bg-transparent hover:border-primary-custom-color cursor-pointer"
            >
              <img alt="google" src={IconApple} width={20} height={20} />
            </Button>
          </div>
          <div className="text-center text-sm text-[#4B5563]">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-custom-color hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
