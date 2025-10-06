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

export default class DonationAdminService {
  static async getAllDonations(params: { search?: string }) {
    try {
      const res = await axiosInstance.get(`/admin/donation-events`, {
        params: params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getDonationsById(id: string) {
    try {
      const res = await axiosInstance.get(`/admin/donation-events/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async updateDonationStatus(id: string, data: VolunteerUpdateRequest) {
    try {
      const res = await axiosInstance.put(`/admin/donation-events/${id}/status`, data)
      toast.success('Donation updated successfully')
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
