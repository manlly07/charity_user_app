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
import DonationService from '@/services/donation.service'
import { CalendarIcon, PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons'
import { ChevronDownIcon, Progress } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'

const CharityDetail = () => {
  const [openFrom, setOpenFrom] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [openTo, setOpenTo] = useState(false)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const donationId = id ? parseInt(id, 10) : 0

  const { data, error } = useSWR('/events/donation/' + id, () =>
    DonationService.getDonationById(donationId)
  )

  const donation = useMemo(() => {
    if (error || !data) return null
    return data
  }, [data, error])

  const { data: u, error: eu } = useSWR('/events/donation/user', () =>
    DonationService.getUsersByDonationId(String(id))
  )

  const donationUsers = useMemo(() => {
    if (eu || !u) return []
    return u
  }, [u, eu])

  return (
    <>
      <div className="relative">
        <div className="image w-full h-[400px]">
          <img src={donation?.pic ?? Banner3} alt="banner" className="w-full h-full object-cover" />
          <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
        </div>
        <div className="absolute bottom-8 left-8">
          <div className="flex gap-4 items-center">
            <div className="space-y-1 text-white">
              <p className="text-2xl font-bold p-0">{donation?.title}</p>
              <p className="text-base text-white/80">{donation?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full m-auto py-12 px-8 space-y-12">
        <div className="shadow-lg p-8 rounded space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Đã quyên góp</p>
              <p className="text-2xl font-bold text-primary-custom-color">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(parseFloat(donation?.totalDonated as string) || 0)}{' '}
              </p>
            </div>
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Mục tiêu</p>
              <p className="text-2xl font-bold ">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(parseFloat(donation?.moneyNeed as string) || 0)}{' '}
              </p>
            </div>
            <div className="grid-cols-1 space-y-1">
              <p className="text-text-custom-color text-base font-medium">Thời gian còn lại</p>
              <p className="text-2xl font-bold text-primary-custom-color">
                {dayjs(donation?.dateEnd).diff(dayjs(donation?.dateStart), 'day')} ngày
              </p>
            </div>
          </div>
          <div>
            <Progress color="grass" value={30} radius="full" />
          </div>
          <Button
            className="w-full bg-[#2E7D32] hover:bg-primary-custom-color cursor-pointer"
            size={'lg'}
            onClick={() => donation?.eventStatus === 'ACTIVE' && navigate('/donate/' + donationId)}
          >
            Quyên Góp Ngay
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 flex items-center gap-3">
            <PersonIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Tổ chức</p>
              <p className="text-base font-medium">{donation?.organizationName}</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center gap-3">
            <CalendarIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Thời gian</p>
              <p className="text-base font-medium">
                {`${dayjs(donation?.dateStart).format('DD/MM')} - ${dayjs(donation?.dateEnd).format('DD/MM/YYYY')}`}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center gap-3">
            <PaperPlaneIcon className="text-primary-custom-color" width={24} height={24} />
            <div className="">
              <p className="text-text-custom-color text-sm">Địa điểm</p>
              <p className="text-base font-medium">-</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-bold">Về Chiến Dịch</p>
          <div className="text-base text-text-secondary space-y-4">
            {/* <p>
              Tại các huyện vùng cao Yên Bái, nhiều em nhỏ vẫn đang thiếu thốn cơ hội tiếp cận giáo
              dục. Chiến dịch này nhằm:
            </p>
            <ul className="ml-4 list-disc space-y-3">
              <li>Trang bị sách vở, đồ dùng học tập</li>
              <li>Cải thiện bữa ăn học đường</li>
              <li>Nâng cấp cơ sở vật chất lớp học</li>
            </ul> */}
            <p>{donation?.description}</p>
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
                {(donationUsers ?? []).map((item: any) => (
                  <TableRow className="text-base">
                    <TableCell className="font-medium">{item?.fullName}</TableCell>
                    <TableCell className="text-primary-custom-color font-medium">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(parseFloat(item?.donateAmount as string) || 0)}{' '}
                    </TableCell>
                    <TableCell className="font-normal text-text-secondary">
                      {item?.note || 'Không có lời nhắn'}
                    </TableCell>
                    <TableCell>2 giờ trước</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharityDetail
