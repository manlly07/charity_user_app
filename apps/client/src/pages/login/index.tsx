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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <div className="w-full h-full relative flex">
      <div className="hidden md:block flex-1 w-full h-full">
        <img className="max-w-[720px] w-full h-full" src={BgLogin} alt="" />
      </div>
      <div className="login-form flex-1 flex items-center justify-center">
        <div className="space-y-8 w-[440px]">
          <div className="space-y-3 text-center">
            <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">Welcome Back</h3>
            <p className="text-base text-[#4B5563]">Login to continue your journey of giving</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
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
                className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-full"
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
            <div className="flex-1 flex items-center justify-center border py-3 rounded-[12px]">
              <img alt="google" src={IconGoogle} width={20} height={20} />
            </div>
            <div className="flex-1 flex items-center justify-center border py-3 rounded-[12px]">
              <img alt="google" src={IconFacebook} width={20} height={20} />
            </div>
            <div className="flex-1 flex items-center justify-center border py-3 rounded-[12px]">
              <img alt="google" src={IconApple} width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
