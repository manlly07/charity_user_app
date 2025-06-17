import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import InputWithIcon from '../InputIcon'

type Props = {
  className?: string
  placeholder?: string
}

const SearchInput = ({
  className,
  placeholder = 'Search for volunteer organizations...'
}: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <InputWithIcon
        placeholder={placeholder}
        startIcon={<MagnifyingGlassIcon width="18" height="18" />}
      />
    </div>
  )
}

export default SearchInput
