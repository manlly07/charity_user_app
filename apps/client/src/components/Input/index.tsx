import { cn } from '@/lib/utils'
import * as React from 'react'
import { Input } from '../ui/input'

const InputCustom = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return <Input ref={ref} className={cn('px-4 py-3', className)} type={type} {...props} />
  }
)

InputCustom.displayName = 'InputCustom'

export default InputCustom
