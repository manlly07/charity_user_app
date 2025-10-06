import axiosInstance from '@/lib/api'
import { RootState } from '@/stores/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router'
import useSWR from 'swr'
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
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user?.id) return <Navigate to={'/login'} />

  const { data, error } = useSWR('/organization/follow', async () => {
    const res = await axiosInstance.get(`/follow/volunteer/${user?.id}`)
    return res.data
  })

  const Organization = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

  return (
    <div className="p-6 space-y-4 shadow rounded-lg">
      <p className="text-lg font-semibold">Organizations You Follow</p>
      {Organization.map((org: any) => (
        <Link
          to={`/organizes/${org?.id}`}
          key={org?.organizationName}
          className="flex items-center space-x-4"
        >
          <Avatar>
            <AvatarImage src={org?.logo} alt={org?.organizationName} />
            <AvatarFallback>{org?.organizationName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{org?.organizationName}</p>
            <p className="text-xs text-secondary-custom-color">{org?.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default OrganizeFollow
