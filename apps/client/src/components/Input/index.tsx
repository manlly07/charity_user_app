import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

const InputCustom = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return <Input className={cn('px-4 py-3', className)} type={type} {...props} />
}

export default InputCustom
