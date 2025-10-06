import axiosInstance from '@/lib/api'
import { Calendar, DollarSign, LayoutGridIcon, Mail, UsersIcon } from 'lucide-react'
import { useMemo } from 'react'
import useSWR from 'swr'
import TableCharities from './table'

const Admin = () => {
  const { data, error } = useSWR('/admin/dashboard', async () => {
    const res = await axiosInstance.get('/admin/dashboard')
    return res.data
  })

  const pendingRequests = useMemo(() => {
    if (error || !data) return []
    return data.pendingRequests
  }, [data, error])

  console.log(data)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 space-y-2 shadow p-4 rounded">
          <UsersIcon className="h-6 w-6 text-green-500" />
          <p className="text-2xl font-bold">{data?.totalVolunteers}</p>
          <p className="text-text-secondary text-sm">Total Volunteers</p>
        </div>
        <div className="col-span-1 space-y-2 shadow p-4 rounded">
          <LayoutGridIcon className="h-6 w-6 text-yellow-500" />
          <p className="text-2xl font-bold">{data?.totalOrganizations}</p>
          <p className="text-text-secondary text-sm">Total Organizations</p>
        </div>
        <div className="col-span-1 space-y-2 shadow p-4 rounded">
          <Calendar className="h-6 w-6 text-blue-500" />
          <p className="text-2xl font-bold">{data?.totalCharityEvents}</p>
          <p className="text-text-secondary text-sm">Charity Events</p>
        </div>
        <div className="col-span-1 space-y-2 shadow p-4 rounded">
          <DollarSign className="h-6 w-6 text-purple-500" />
          <p className="text-2xl font-bold">{data?.totalDonationEvents}</p>
          <p className="text-text-secondary text-sm">Donations Event</p>
        </div>
        <div className="col-span-1 space-y-2 shadow p-4 rounded">
          <Mail className="h-6 w-6 text-red-500" />
          <p className="text-2xl font-bold">{data?.totalPendingRequests}</p>
          <p className="text-text-secondary text-sm">Pending Requests</p>
        </div>
      </div>
      <div className="p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Pending Request</h2>
        <TableCharities charities={pendingRequests} />
      </div>
    </div>
  )
}

export default Admin
