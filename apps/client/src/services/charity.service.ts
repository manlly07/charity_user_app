import { RequestStatus } from '@/enum'
import axiosInstance from '@/lib/api'
import { charityFormSchema } from '@/types/charity.type'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default class CharityService {
  static async getList(id: number) {
    try {
      const res = await axiosInstance.get('/events/charity/' + id + '/organization')
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
