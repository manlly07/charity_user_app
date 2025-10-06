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

export default class VolunteersService {
  static async getAllVolunteers(params: { search?: string }) {
    try {
      const res = await axiosInstance.get(`/admin/volunteers`, {
        params: params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getVolunteerById(id: string) {
    try {
      const res = await axiosInstance.get(`/admin/volunteers/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async updateVolunteer(id: string, data: VolunteerUpdateRequest) {
    try {
      const res = await axiosInstance.put(`/admin/volunteers/${id}`, data)
      toast.success('Volunteer updated successfully')
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
}
