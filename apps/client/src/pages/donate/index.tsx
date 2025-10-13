import { CheckIcon, QrCode } from '@/assets'
import { InputCustom } from '@/components'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import axiosInstance from '@/lib/api'
import DonationService from '@/services/donation.service'
import { RootState } from '@/stores/store'
import { formatVND } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge, Progress } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { z } from 'zod'
const FormSchema = z.object({
  name: z.string().trim().max(255, 'Name must be at most 255 characters long'),
  price: z.string().min(0),
  description: z.string().trim().min(0)
})

const PRICES = [100000, 200000, 500000, 1000000]

const CharityDetail = () => {
  const { id } = useParams<{ id: string }>()
  const donationId = id ? parseInt(id, 10) : 0

  const generateSimpleId = () => {
    const timestamp = Date.now().toString().slice(-6) // 6 chữ số cuối của timestamp
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')
    return timestamp + random
  }

  const [uuid, setUuid] = useState(generateSimpleId())
  const { data, error } = useSWR('/events/donation/' + id, () =>
    DonationService.getDonationById(donationId)
  )

  const donation = useMemo(() => {
    if (error || !data) return null

    const total = parseFloat(data.totalDonated) || 0
    const need = parseFloat(data.moneyNeed) || 0
    const percent = need > 0 ? Math.min(100, (total / need) * 100) : 0

    return {
      ...data,
      totalFormatted: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        total
      ),
      needFormatted: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        need
      ),
      percent
    }
  }, [data, error])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      price: '100000',
      description: ''
    }
  })
  const { user } = useSelector((state: RootState) => state.auth)

  const description = form.watch('description')

  useEffect(() => {
    if (!description.trim()) return
    if (!description.startsWith(uuid)) {
      const newDes = uuid + ' ' + description.trim()
      form.setValue('description', newDes, { shouldDirty: false })
    }
  }, [description, uuid])

  useEffect(() => {
    if (description.trim() === '') {
      setUuid(generateSimpleId())
    }
  }, [description])

  const qrCode = useMemo(() => {
    if (!donation || description.trim() === '') return QrCode
    const newDes = uuid + ' ' + description.trim()
    return `https://img.vietqr.io/image/MB-${donation?.bankAccount}-qr_only.png?amount=${form.getValues(
      'price'
    )}&addInfo=${encodeURIComponent(newDes)}`
  }, [description, donation, form, uuid])

  const checkPaid = async () => {
    try {
      const { data } = await axios.get(
        'https://script.google.com/macros/s/AKfycbx_C_ldo4LaPooYJqOvsp5Qa8iPNZlqvBHu8UzlbUG7dauemoeUnXxcDU2AZpT_WpPu/exec'
      )
      console.log('Fetched data:', data)
      const lastPaid = data.data[data.data.length - 1]
      console.log('last paid', lastPaid)
      if (description.trim() !== '' && lastPaid && lastPaid['Mô tả'].includes(description.trim())) {
        console.log('Payment matched:', lastPaid)
        // Xử lý khi tìm thấy giao dịch phù hợp
        // Ví dụ: Hiển thị thông báo thành công
        alert(
          `Cảm ơn bạn ${form.getValues(
            'name'
          )} đã quyên góp ${form.getValues('price')} cho chương trình "${donation?.title}"!`
        )
        const res = await axiosInstance.post('/donations', {
          volunteerId: user?.id,
          donationEventId: donationId,
          donateAmount: parseFloat(lastPaid['Giá trị'] || '0'),
          note: description.trim()
        })

        console.log('Recorded donation:', res.data)

        form.reset()
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="max-w-[750px] w-full m-auto p-8 space-y-9 shadow-lg rounded-xl mb-12">
      <div className="space-y-2">
        <Badge color="grass" radius="full">
          Đang kêu gọi
        </Badge>
        <p className="text-2xl font-bold">{donation?.title}</p>
        <div className="text-base text-text-secondary">
          <p className="flex items-center gap-2">
            Tổ chức bởi: {donation?.organizationName}
            <img src={CheckIcon} alt="" width={20} height={20} />
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Progress radius="full" value={donation?.percent} color="grass" size={'3'} />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Đã quyên góp</p>
              <p className="font-bold text-sm text-[#2E7D32]">{donation?.totalFormatted}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-right">Mục tiêu</p>
              <p className="font-medium text-sm text-text-secondary">{donation?.needFormatted}</p>
            </div>
          </div>
          <p className=" text-sm text-text-secondary">Thời gian còn lại: 15 ngày</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-9">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên người quyên góp</FormLabel>
                <FormControl>
                  <InputCustom type="email" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="is_name"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      return field.onChange(checked)
                    }}
                  />
                </FormControl>
                <FormMessage />
                <FormLabel className="font-normal text-sm">
                  Hiển thị tên thật của tôi trong danh sách người quyên góp
                </FormLabel>
              </FormItem>
            )}
          /> */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tiền quyên góp</FormLabel>
                  <FormControl>
                    <InputCustom type="number" placeholder="Enter your price" {...field} min={0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-between">
              {PRICES.map((price) => (
                <div
                  onClick={() => form.setValue('price', price.toString())}
                  key={price}
                  className="px-8 py-2 border border-border rounded-lg cursor-pointer text-base font-normal"
                >
                  {formatVND(price)}
                </div>
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung chuyển khoản</FormLabel>
                <FormControl>
                  <InputCustom type="text" placeholder="Nội dung chuyển khoản" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button onClick={checkPaid}>Kiểm tra giao dịch</Button>
          <div className="p-6 bg-[#F8F9FA] border border-border rounded-lg space-y-6 text-center">
            <p className="text-base font-medium">Quét mã QR để quyên góp</p>
            <div className="image w-60 h-60 m-auto">
              <img src={qrCode} alt="" />
            </div>
            <p className="text-sm text-text-secondary">
              Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử
            </p>
            <div className="space-y-2 [&>*]:text-sm text-text-secondary text-left">
              {/* <p>
                <span>Tên TK: </span>
                <span>QUỸ TỪ THIỆN GREEN HEARTS</span>
              </p> */}
              <p>
                <span>Số TK: </span>
                <span>{donation?.bankAccount}</span>
              </p>
              <p>
                <span>Ngân hàng: </span>
                <span>MB </span>
              </p>
              <p>
                <span>Nội dung CK: </span>
                <span>
                  {description.trim() === ''
                    ? '[Họ tên] ủng hộ lũ lụt miền Trung'
                    : description.trim()}
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Làm thế nào để quét mã QR?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Bạn chỉ cần mở ứng dụng camera hoặc ứng dụng quét mã QR trên điện thoại, hướng
                camera vào mã QR để hệ thống tự động nhận diện và mở liên kết tương ứng.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Mất bao lâu để xử lý giao dịch?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Thông thường, giao dịch sẽ được xử lý trong vài giây đến vài phút tùy theo hệ thống
                thanh toán và kết nối mạng.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Tôi có thể hủy quyên góp không?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Có, bạn có thể hủy quyên góp bất kỳ lúc nào bằng cách truy cập vào phần quản lý giao
                dịch hoặc liên hệ bộ phận hỗ trợ khách hàng
              </CollapsibleContent>
            </Collapsible>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CharityDetail
