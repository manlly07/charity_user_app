import { RequestStatus } from '@/enum'
import { Donation } from '@/hooks/useDonations'
import axiosInstance from '@/lib/api'
import { donationFormSchema } from '@/types/donation.type'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default class DonationService {
  static async getInfoDashboard(organizationId: number) {
    try {
      const res = await axiosInstance.get('/events/dashboard/organization/' + organizationId)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
      return []
    }
  }

  static async getUsersByDonationId(eventId: string) {
    try {
      const res = await axiosInstance.get(`/events/donation/${eventId}/users`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getDonationById(id: number): Promise<Donation | null> {
    try {
      const res = await axiosInstance.get(`/events/donation/${id}`)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
      return null
    }
  }

  static async getDashboard(): Promise<Donation[]> {
    try {
      const res = await axiosInstance.get('/events/donation')
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
      return []
    }
  }

  static async getList(id: number, params?: { name?: string; from?: string; to?: string }) {
    try {
      const res = await axiosInstance.get('/events/donation/' + id + '/organization', {
        params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async create(dto: z.infer<typeof donationFormSchema>) {
    try {
      const res = await axiosInstance.post(
        '/events/donation',
        {
          ...dto,
          dateStart: dayjs(dto.dateStart).format('YYYY-MM-DDTHH:mm:ss'),
          dateEnd: dayjs(dto.dateEnd).format('YYYY-MM-DDTHH:mm:ss')
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
