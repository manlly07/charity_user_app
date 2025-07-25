import { RequestStatus } from '@/enum'
import axiosInstance from '@/lib/api'
import { OrganizationFormData } from '@/types/organization.type'
import { toast } from 'react-toastify'

export default class RequestService {
  static async create(dto: OrganizationFormData, id: number) {
    try {
      const res = await axiosInstance.post(
        '/requests',
        {
          ...dto,
          volunteerId: id
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
      // throw error
    }
  }

  static async getById(id: number) {
    const res = await axiosInstance.get(`/requests/${id}`)
    return res.data
  }

  static async updateStatus(id: number, status: RequestStatus) {
    const res = await axiosInstance.put(`/requests/${id}`, {
      status
    })
    return res.data
  }
}
