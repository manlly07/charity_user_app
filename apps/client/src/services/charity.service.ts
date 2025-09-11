import { RequestStatus } from '@/enum'
import axiosInstance from '@/lib/api'
import { CharityEventResponseList } from '@/pages/home'
import { charityFormSchema } from '@/types/charity.type'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default class CharityService {
  static async joinProgram(eventId: number, volunteerId: number) {
    try {
      const res = await axiosInstance.post(`/events/charity/${eventId}/join`, null, {
        params: { volunteerId }
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async leaveProgram(eventId: number, volunteerId: number) {
    try {
      const res = await axiosInstance.post(`/events/charity/${eventId}/leave`, null, {
        params: { volunteerId }
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getCharityById(
    id: number,
    volunteerId?: number
  ): Promise<CharityEventResponseList | null> {
    try {
      const res = await axiosInstance.get(`/events/charity/${id}`, {
        params: volunteerId ? { volunteerId } : {}
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
      return null
    }
  }

  static async getDashboard(id: number) {
    try {
      const res = await axiosInstance.get('/events/charity?id=' + id)
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async getList(id: number, params?: { name?: string; from?: string; to?: string }) {
    try {
      const res = await axiosInstance.get('/events/charity/' + id + '/organization', {
        params
      })
      return res.data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  static async create(dto: z.infer<typeof charityFormSchema>) {
    try {
      const res = await axiosInstance.post(
        '/events/charity',
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
