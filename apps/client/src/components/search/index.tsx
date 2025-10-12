import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import InputWithIcon from '../InputIcon'

type Props = {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onIconClick?: () => void
}

const SearchInput = ({
  className,
  placeholder = 'Search for volunteer organizations...',
  value,
  onChange,
  onKeyDown,
  onIconClick
}: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <InputWithIcon
        placeholder={placeholder}
        startIcon={
          <MagnifyingGlassIcon
            width="18"
            height="18"
            className="cursor-pointer"
            onClick={onIconClick}
          />
        }
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default SearchInput
