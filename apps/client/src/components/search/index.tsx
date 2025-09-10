import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import InputWithIcon from '../InputIcon'

type Props = {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({
  className,
  placeholder = 'Search for volunteer organizations...',
  value,
  onChange
}: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <InputWithIcon
        placeholder={placeholder}
        startIcon={<MagnifyingGlassIcon width="18" height="18" />}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput
