import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import InputWithIcon from '../InputIcon'

type Props = {
  className?: string
}

const SearchInput = ({ className }: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <InputWithIcon
        placeholder="Search for volunteer organizations..."
        startIcon={<MagnifyingGlassIcon width="18" height="18" />}
      />
    </div>
  )
}

export default SearchInput
