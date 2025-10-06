import { EEventStatus } from '@/hooks/useDonationAdmin'
import axiosInstance from '@/lib/api'
import { toast } from 'react-toastify'

export enum Role {
  ROLE_USER,
  ROLE_ORGANIZATION,
  ROLE_ADMIN
}

export interface VolunteerUpdateRequest {
  eventStatus: EEventStatus
}

export default class CharitiesAdminService {
  static async getAllCharityEvents(params: { search?: string }) {
    try {
      const res = await axiosInstance.get(`/admin/charity-events`, {
        params: params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getCharitiesById(id: string) {
    try {
      const res = await axiosInstance.get(`/admin/charity-events/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async updateCharityEventStatus(id: string, data: VolunteerUpdateRequest) {
    try {
      const res = await axiosInstance.put(`/admin/charity-events/${id}/status`, data)
      toast.success('Charity updated successfully')
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
