import { RequestStatus } from '@/enum'
import { RequestListResponse } from '@/hooks/useRequestAdmin'
import axiosInstance from '@/lib/api'
import { toast } from 'react-toastify'

type UpdateStatus = {
  status: RequestStatus
  denyReason?: string
}

export default class RequestAminService {
  static async getAllRequests(params: { search?: string }) {
    try {
      const res = await axiosInstance.get(`/admin/requests`, {
        params: params
      })
      return res.data as RequestListResponse[]
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getRequestById(id: string) {
    try {
      const res = await axiosInstance.get(`/admin/requests/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async updateStatusRequest(id: number, data: UpdateStatus) {
    try {
      const res = await axiosInstance.put(`/admin/requests/${id}/status`, data)
      toast.success('Organization updated successfully')
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async deleteOrganization(id: string) {
    try {
      const res = await axiosInstance.delete(`/admin/organizations/${id}`)
      toast.success('Organization deleted successfully')
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
}
