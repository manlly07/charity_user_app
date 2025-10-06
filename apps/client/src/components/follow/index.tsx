import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

type FollowIconProps = {
  followed: boolean
  onClick?: () => void
}

const FollowIcon = ({ followed, onClick }: FollowIconProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'rounded-2xl px-4',
        !followed
          ? 'border-primary-custom-color text-primary-custom-color hover:bg-transparent hover:text-primary-custom-color/70'
          : 'border-red-500 text-red-500 hover:bg-transparent hover:text-red-500/70'
      )}
      variant="outline"
    >
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowIcon
