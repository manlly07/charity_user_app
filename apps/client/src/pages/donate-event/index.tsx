import { Banner3 } from '@/assets'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CalendarIcon, PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons'
import { ChevronDownIcon, Progress } from '@radix-ui/themes'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const CharityDetail = () => {
  const [openFrom, setOpenFrom] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [openTo, setOpenTo] = useState(false)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const navigate = useNavigate()
  return (
    <>
      <div className="relative">
        <div className="image w-full h-[400px]">
          <img src={Banner3} alt="banner" className="w-full h-full object-cover" />
          <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
        </div>
        <div className="absolute bottom-8 left-8">
          <div className="flex gap-4 items-center">
            <div className="space-y-1 text-white">
              <p className="text-2xl font-bold p-0">Chung Tay Vì Trẻ Em Vùng Cao</p>
              <p className="text-base text-white/80">Mang cơ hội học tập đến trẻ em Yên Bái</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full m-auto py-12 px-8 space-y-12">
        <div className="shadow-lg p-8 rounded space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Đã quyên góp</p>
              <p className="text-2xl font-bold text-primary-custom-color">120.000.000₫</p>
            </div>
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Mục tiêu</p>
              <p className="text-2xl font-bold ">500.000.000₫</p>
            </div>
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Thời gian còn lại</p>
              <p className="text-2xl font-bold text-primary-custom-color">Còn 15 ngày nữa</p>
            </div>
          </div>
          <div>
            <Progress color="grass" value={30} radius="full" />
          </div>
          <Button
            className="w-full bg-[#2E7D32] hover:bg-primary-custom-color cursor-pointer"
            size={'lg'}
            onClick={() => navigate('/donate/1')}
          >
            Quyên Góp Ngay
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 flex items-center gap-3">
            <PersonIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Tổ chức</p>
              <p className="text-base font-medium">Quỹ Từ Thiện ABC</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center gap-3">
            <CalendarIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Thời gian</p>
              <p className="text-base font-medium">01/06 - 30/06/2025</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center gap-3">
            <PaperPlaneIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Địa điểm</p>
              <p className="text-base font-medium">Yên Bái, Việt Nam</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-bold">Về Chiến Dịch</p>
          <div className="text-base text-text-secondary space-y-4">
            <p>
              Tại các huyện vùng cao Yên Bái, nhiều em nhỏ vẫn đang thiếu thốn cơ hội tiếp cận giáo
              dục. Chiến dịch này nhằm:
            </p>
            <ul className="ml-4 list-disc space-y-3">
              <li>Trang bị sách vở, đồ dùng học tập</li>
              <li>Cải thiện bữa ăn học đường</li>
              <li>Nâng cấp cơ sở vật chất lớp học</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-6">
            <SearchInput placeholder="Tìm kiếm người quyên góp..." className="max-w-[1000px]" />
            <div className="flex gap-2">
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {dateFrom ? dateFrom.toLocaleDateString() : 'Date Start'}
                      <ChevronDownIcon />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDateFrom(date)
                      setOpenFrom(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {dateTo ? dateTo.toLocaleDateString() : 'Date To'}
                      <ChevronDownIcon />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDateTo(date)
                      setOpenTo(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow className="[&>*]:text-sm [&>*]:text-text-secondary">
                  <TableHead className="max-w-[276px]">Người quyên góp</TableHead>
                  <TableHead className="max-w-[276px]">Số tiền</TableHead>
                  <TableHead className="w-[calc(100%-3*276px)]">Lời nhắn</TableHead>
                  <TableHead className="max-w-[276px]">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-base">
                  <TableCell className="font-medium">Nguyễn Văn A</TableCell>
                  <TableCell className="text-primary-custom-color font-medium">
                    2.000.000₫
                  </TableCell>
                  <TableCell className="font-normal text-text-secondary">
                    Chúc các em có một môi trường học tập tốt
                  </TableCell>
                  <TableCell>2 giờ trước</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharityDetail
