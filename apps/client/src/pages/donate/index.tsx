import { CheckIcon, QrCode } from '@/assets'
import { InputCustom } from '@/components'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { formatVND } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge, Progress } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
type Props = {}
const FormSchema = z.object({
  name: z.string().trim().email().max(255, 'Name must be at most 255 characters long'),
  price: z.number().min(0),
  description: z.string().trim().min(0),
  is_name: z.boolean()
})

const PRICES = [100000, 200000, 500000, 1000000]

const CharityDetail = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })
  return (
    <div className="max-w-[750px] w-full m-auto p-8 space-y-9 shadow-lg rounded mb-12">
      <div className="space-y-2">
        <Badge color="grass" radius="full">
          Đang kêu gọi
        </Badge>
        <p className="text-2xl font-bold">Hỗ Trợ Nạn Nhân Lũ Lụt Miền Trung</p>
        <div className="text-base text-text-secondary">
          <p className="flex items-center gap-2">
            Tổ chức bởi: Quỹ Từ Thiện Green Hearts
            <img src={CheckIcon} alt="" width={20} height={20} />
          </p>
          <p>Mã số thuế: 0123456789</p>
        </div>
      </div>
      <div className="space-y-4">
        <Progress radius="full" value={50} color="grass" size={'3'} />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Đã quyên góp</p>
              <p className="font-bold text-sm text-[#2E7D32]">152.500.000₫</p>
            </div>
            <div>
              <p className="font-medium text-sm text-right">Mục tiêu</p>
              <p className="font-medium text-sm text-text-secondary">500.000.000₫</p>
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
          <FormField
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
          />
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
                  key={price}
                  className="px-8 py-2 border border-border rounded-lg cursor-pointer text-base font-normal"
                >
                  {formatVND(price)}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 bg-[#F8F9FA] border border-border rounded-lg space-y-6 text-center">
            <p className="text-base font-medium">Quét mã QR để quyên góp</p>
            <div className="image w-60 h-60 m-auto">
              <img src={QrCode} alt="" />
            </div>
            <p className="text-sm text-text-secondary">
              Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử
            </p>
            <div className="space-y-2 [&>*]:text-sm text-text-secondary text-left">
              <p>
                <span>Tên TK: </span>
                <span>QUỸ TỪ THIỆN GREEN HEARTS</span>
              </p>
              <p>
                <span>Số TK: </span>
                <span>123 456 789</span>
              </p>
              <p>
                <span>Ngân hàng: </span>
                <span>Vietcombank </span>
              </p>
              <p>
                <span>Nội dung CK: </span>
                <span>[Họ tên] ủng hộ lũ lụt miền Trung</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Làm thế nào để quét mã QR?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Yes. Free to use for personal and commercial projects. No attribution required.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Mất bao lâu để xử lý giao dịch?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Yes. Free to use for personal and commercial projects. No attribution required.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="text-base font-normal text-text-secondary">
                Tôi có thể hủy quyên góp không?
              </CollapsibleTrigger>
              <CollapsibleContent>
                Yes. Free to use for personal and commercial projects. No attribution required.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CharityDetail
