import axiosInstance from '@/lib/api'
import { toast } from 'react-toastify'

export enum Role {
  ROLE_USER,
  ROLE_ORGANIZATION,
  ROLE_ADMIN
}

export interface VolunteerUpdateRequest {
  email?: string // optional vì khi update có thể không thay đổi
  password?: string // optional, vẫn giữ giới hạn dài trong backend
  fullName?: string // optional
  contact?: string // optional
  role?: Role // optional
  isActive?: boolean // optional
  isBanned?: boolean // optional
}

export default class OrganizationService {
  static async getAllOrganizations(params: { search?: string }) {
    try {
      const res = await axiosInstance.get(`/admin/organizations`, {
        params: params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getOrganizationById(id: string) {
    try {
      const res = await axiosInstance.get(`/admin/organizations/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async updateOrganizations(id: string, data: VolunteerUpdateRequest) {
    try {
      const res = await axiosInstance.put(`/admin/organizations/${id}`, data)
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
