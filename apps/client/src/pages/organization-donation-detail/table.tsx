import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Donation } from '@/hooks/useDonations'
import { cn } from '@/lib/utils'
import DonationService from '@/services/donation.service'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router'
import useSWR from 'swr'

type TDonationUser = {
  id: number
  name: string
  email: string
  phone: string
  amount: number
  date: string
}

const donationUsers: TDonationUser[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a.nguyen@example.com',
    phone: '0901234567',
    amount: 100,
    date: '2025-07-01'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b.tran@example.com',
    phone: '0912345678',
    amount: 50,
    date: '2025-07-02'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'c.le@example.com',
    phone: '0923456789',
    amount: 200,
    date: '2025-07-03'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'd.pham@example.com',
    phone: '0934567890',
    amount: 150,
    date: '2025-07-04'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'e.hoang@example.com',
    phone: '0945678901',
    amount: 70,
    date: '2025-07-05'
  },
  {
    id: 6,
    name: 'Đỗ Thị F',
    email: 'f.do@example.com',
    phone: '0956789012',
    amount: 80,
    date: '2025-07-06'
  },
  {
    id: 7,
    name: 'Ngô Văn G',
    email: 'g.ngo@example.com',
    phone: '0967890123',
    amount: 90,
    date: '2025-07-07'
  },
  {
    id: 8,
    name: 'Bùi Thị H',
    email: 'h.bui@example.com',
    phone: '0978901234',
    amount: 120,
    date: '2025-07-08'
  },
  {
    id: 9,
    name: 'Vũ Văn I',
    email: 'i.vu@example.com',
    phone: '0989012345',
    amount: 300,
    date: '2025-07-09'
  },
  {
    id: 10,
    name: 'Dương Thị J',
    email: 'j.duong@example.com',
    phone: '0990123456',
    amount: 250,
    date: '2025-07-10'
  },
  {
    id: 11,
    name: 'Nguyễn Văn K',
    email: 'k.nguyen@example.com',
    phone: '0902234567',
    amount: 110,
    date: '2025-07-11'
  },
  {
    id: 12,
    name: 'Trần Thị L',
    email: 'l.tran@example.com',
    phone: '0913345678',
    amount: 60,
    date: '2025-07-12'
  },
  {
    id: 13,
    name: 'Lê Văn M',
    email: 'm.le@example.com',
    phone: '0924456789',
    amount: 180,
    date: '2025-07-13'
  },
  {
    id: 14,
    name: 'Phạm Thị N',
    email: 'n.pham@example.com',
    phone: '0935567890',
    amount: 90,
    date: '2025-07-14'
  },
  {
    id: 15,
    name: 'Hoàng Văn O',
    email: 'o.hoang@example.com',
    phone: '0946678901',
    amount: 220,
    date: '2025-07-15'
  },
  {
    id: 16,
    name: 'Đỗ Thị P',
    email: 'p.do@example.com',
    phone: '0957789012',
    amount: 75,
    date: '2025-07-16'
  },
  {
    id: 17,
    name: 'Ngô Văn Q',
    email: 'q.ngo@example.com',
    phone: '0968890123',
    amount: 130,
    date: '2025-07-17'
  },
  {
    id: 18,
    name: 'Bùi Thị R',
    email: 'r.bui@example.com',
    phone: '0979901234',
    amount: 140,
    date: '2025-07-18'
  },
  {
    id: 19,
    name: 'Vũ Văn S',
    email: 's.vu@example.com',
    phone: '0980012345',
    amount: 190,
    date: '2025-07-19'
  },
  {
    id: 20,
    name: 'Dương Thị T',
    email: 't.duong@example.com',
    phone: '0991123456',
    amount: 160,
    date: '2025-07-20'
  }
]

const TableCharityUsers = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return <Navigate to="/organization/donations" replace />
  const { data, error } = useSWR('/events/charity', () => DonationService.getUsersByDonationId(id))

  const donationUsers = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

  const columns: ColumnDef<Donation>[] = [
    {
      accessorKey: 'fullName',
      header: 'Full Name',
      cell: ({ row }) => row.getValue('fullName')
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.getValue('email')
    },
    {
      accessorKey: 'contact',
      header: 'Phone Number',
      cell: ({ row }) => row.getValue('contact')
    },
    {
      accessorKey: 'donateAmount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="text-primary-custom-color font-semibold">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(row.getValue('donateAmount'))}
        </div>
      )
    },
    {
      accessorKey: 'donateTime',
      header: 'Date & Time',
      cell: ({ row }) => {
        dayjs(row.getValue('donateTime')).format('YYYY-MM-DD')
      }
    }
  ]

  const table = useReactTable({
    data: donationUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  const paginationItems = useMemo(() => {
    const range: (number | string)[] = []

    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) range.push(i)
      return range
    }

    range.push(0)

    const start = Math.max(currentPage - 1, 1)
    const end = Math.min(currentPage + 1, totalPages - 2)

    if (start > 1) range.push('start-ellipsis')

    for (let i = start; i <= end; i++) range.push(i)

    if (end < totalPages - 2) range.push('end-ellipsis')

    range.push(totalPages - 1)

    return range
  }, [currentPage, totalPages])

  return (
    <div className="space-y-4">
      <Table className="border rounded-lg">
        <TableHeader className="bg-white h-14">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious isActive />
          </PaginationItem>
          {paginationItems.map((item, index) =>
            item === 'start-ellipsis' || item === 'end-ellipsis' ? (
              <PaginationItem key={index}>
                <span className="px-2">...</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive
                  onClick={() => table.setPageIndex(item as number)}
                  className={cn({
                    'bg-primary-custom-color text-white': currentPage === (item as number)
                  })}
                >
                  {(item as number) + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext isActive />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TableCharityUsers
