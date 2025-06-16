import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Organization = [
  {
    id: 1,
    name: 'Green Earth Initiative',
    username: 'New program posted',
    image: 'https://github.com/leerob.png'
  },
  {
    id: 2,
    name: 'City Food Bank',
    username: '',
    image: 'https://github.com/shadcn.png'
  },
  {
    id: 3,
    name: 'Animal Shelter Network',
    username: 'New program posted',
    image: 'https://github.com/evilrabbit.png'
  }
]

const OrganizeFollow = () => {
  return (
    <div className="p-6 space-y-4 shadow">
      <p className="text-lg font-semibold">Organizations You Follow</p>
      {Organization.map((org) => (
        <Link
          to={`/organizes/${org.id}`}
          key={org.username}
          className="flex items-center space-x-4"
        >
          <Avatar>
            <AvatarImage src={org.image} alt={org.name} />
            <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{org.name}</p>
            <p className="text-xs text-secondary-custom-color">{org.username}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default OrganizeFollow
