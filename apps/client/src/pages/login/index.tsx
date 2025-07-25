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
import { login } from '@/stores/slices/auth.slice'
import { AppDispatch } from '@/stores/store'
import { LoginData } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { z } from 'zod'
const FormSchema = z.object({
  email: z.string().trim().email().max(255, 'Email must be at most 255 characters long'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password must be at most 255 characters long')
})

const Login = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginData) => {
    const res = await dispatch(login(data))
    if (res.meta.requestStatus === 'fulfilled') {
      return navigate('/')
    }

    if (res.meta.requestStatus === 'rejected') {
      if (res.payload.status === 401) toast.error('Login failed')
    }
  }

  return (
    <div className="w-full h-screen relative flex">
      <div className="hidden md:block flex-1 w-full h-full">
        <img className="w-full h-full" src={BgLogin} alt="bglogin" />
      </div>
      <div className="login-form flex-1 flex items-center justify-center p-6">
        <div className="space-y-8 w-[440px]">
          <div className="space-y-3 text-center">
            <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">Welcome Back</h3>
            <p className="text-base text-[#4B5563]">Login to continue your journey of giving</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <InputCustom
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        autoComplete="username"
                      />
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
                      <InputCustom
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        autoComplete="current-password"
                      />
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
                Login
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
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-primary-custom-color hover:underline font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
