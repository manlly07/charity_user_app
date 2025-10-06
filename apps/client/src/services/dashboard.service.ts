import axiosInstance from '@/lib/api'
import { toast } from 'react-toastify'

export default class DashboadService {
  static async getDashboardInfoUser(userId: number, organizationId: number) {
    try {
      const res = await axiosInstance.get(
        `/events/dashboard/user?userId=${userId}&organizationId=${organizationId}`
      )
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
}
