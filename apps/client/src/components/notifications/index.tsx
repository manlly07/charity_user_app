import { cn } from '@/lib/utils'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Organization = [
  {
    id: 1,
    name: 'Green Earth Initiative',
    username: 'New program posted',
    image: 'https://github.com/leerob.png',
    is_online: true
  },
  {
    id: 2,
    name: 'City Food Bank',
    username: '',
    image: 'https://github.com/shadcn.png',
    is_online: false
  },
  {
    id: 3,
    name: 'Animal Shelter Network',
    username: 'New program posted',
    image: 'https://github.com/evilrabbit.png',
    is_online: true
  }
]

const Notifications = () => {
  return (
    <div className="p-6 space-y-4 shadow rounded-lg">
      <p className="text-lg font-semibold">Notifications</p>
      {Organization.map((org) => (
        <Link
          to={`/organizes/${org.id}`}
          key={org.username}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center gap-2">
            <div
              className={cn('w-1.5 h-1.5 rounded-full', {
                'bg-green-500': org.is_online,
                'bg-gray-400': !org.is_online
              })}
            ></div>
            <Avatar>
              <AvatarImage src={org.image} alt={org.name} />
              <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-0.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{org.name}</p>
              <p className="text-xs text-text-secondary">2m ago</p>
            </div>
            <p className="text-xs text-text-custom-color">{org.username}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Notifications
