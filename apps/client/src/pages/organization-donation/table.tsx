import { Banner1 } from '@/assets'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Progress } from '@/components/ui/progress'
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
import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
type TDonationStatus = 'active' | 'inactive' | 'upcoming' | 'completed'

type TDonation = {
  id: number
  name: string
  image: string // URL đến ảnh đại diện
  startDate: string // ISO date string, ví dụ: "2025-07-15"
  donatedAmount: number
  targetAmount: number
  status: TDonationStatus
}

// const donations: TDonation[] = [
//   {
//     id: 1,
//     name: 'Build School Library',
//     image: 'https://example.com/image1.jpg',
//     startDate: '2025-07-01',
//     donatedAmount: 35000000,
//     targetAmount: 50000000,
//     status: 'active'
//   },
//   {
//     id: 2,
//     name: 'Clean Water for Villages',
//     image: 'https://example.com/image2.jpg',
//     startDate: '2025-06-20',
//     donatedAmount: 12000000,
//     targetAmount: 25000000,
//     status: 'active'
//   },
//   {
//     id: 3,
//     name: 'Medical Aid for Children',
//     image: 'https://example.com/image3.jpg',
//     startDate: '2025-05-10',
//     donatedAmount: 50000000,
//     targetAmount: 50000000,
//     status: 'completed'
//   },
//   {
//     id: 4,
//     name: 'Winter Clothes Drive',
//     image: 'https://example.com/image4.jpg',
//     startDate: '2025-09-01',
//     donatedAmount: 0,
//     targetAmount: 20000000,
//     status: 'upcoming'
//   },
//   {
//     id: 5,
//     name: 'Scholarship Fund for Students',
//     image: 'https://example.com/image5.jpg',
//     startDate: '2025-04-15',
//     donatedAmount: 15000000,
//     targetAmount: 30000000,
//     status: 'inactive'
//   },
//   {
//     id: 6,
//     name: 'Food Distribution Program',
//     image: 'https://example.com/image6.jpg',
//     startDate: '2025-06-10',
//     donatedAmount: 10000000,
//     targetAmount: 20000000,
//     status: 'active'
//   },
//   {
//     id: 7,
//     name: 'Orphanage Renovation',
//     image: 'https://example.com/image7.jpg',
//     startDate: '2025-03-22',
//     donatedAmount: 20000000,
//     targetAmount: 50000000,
//     status: 'completed'
//   },
//   {
//     id: 8,
//     name: 'Books for Remote Schools',
//     image: 'https://example.com/image8.jpg',
//     startDate: '2025-08-01',
//     donatedAmount: 0,
//     targetAmount: 10000000,
//     status: 'upcoming'
//   },
//   {
//     id: 9,
//     name: 'Bicycle Donation Campaign',
//     image: 'https://example.com/image9.jpg',
//     startDate: '2025-06-01',
//     donatedAmount: 5000000,
//     targetAmount: 15000000,
//     status: 'active'
//   },
//   {
//     id: 10,
//     name: 'Flood Relief Fund',
//     image: 'https://example.com/image10.jpg',
//     startDate: '2025-05-05',
//     donatedAmount: 18000000,
//     targetAmount: 20000000,
//     status: 'completed'
//   },
//   {
//     id: 11,
//     name: 'Charity Health Camp',
//     image: 'https://example.com/image11.jpg',
//     startDate: '2025-07-10',
//     donatedAmount: 8000000,
//     targetAmount: 15000000,
//     status: 'active'
//   },
//   {
//     id: 12,
//     name: 'Women Empowerment Workshop',
//     image: 'https://example.com/image12.jpg',
//     startDate: '2025-09-10',
//     donatedAmount: 0,
//     targetAmount: 10000000,
//     status: 'upcoming'
//   },
//   {
//     id: 13,
//     name: 'Plant Trees for Future',
//     image: 'https://example.com/image13.jpg',
//     startDate: '2025-07-05',
//     donatedAmount: 2200000,
//     targetAmount: 5000000,
//     status: 'active'
//   },
//   {
//     id: 14,
//     name: 'Village Electrification',
//     image: 'https://example.com/image14.jpg',
//     startDate: '2025-01-15',
//     donatedAmount: 40000000,
//     targetAmount: 40000000,
//     status: 'completed'
//   },
//   {
//     id: 15,
//     name: 'Animal Shelter Support',
//     image: 'https://example.com/image15.jpg',
//     startDate: '2025-06-30',
//     donatedAmount: 7000000,
//     targetAmount: 15000000,
//     status: 'active'
//   },
//   {
//     id: 16,
//     name: 'Build Rural Toilets',
//     image: 'https://example.com/image16.jpg',
//     startDate: '2025-08-20',
//     donatedAmount: 0,
//     targetAmount: 12000000,
//     status: 'upcoming'
//   },
//   {
//     id: 17,
//     name: 'Emergency Medical Fund',
//     image: 'https://example.com/image17.jpg',
//     startDate: '2025-03-05',
//     donatedAmount: 25000000,
//     targetAmount: 30000000,
//     status: 'completed'
//   },
//   {
//     id: 18,
//     name: 'Youth Education Program',
//     image: 'https://example.com/image18.jpg',
//     startDate: '2025-05-18',
//     donatedAmount: 10000000,
//     targetAmount: 25000000,
//     status: 'inactive'
//   },
//   {
//     id: 19,
//     name: 'Hospital Equipment Support',
//     image: 'https://example.com/image19.jpg',
//     startDate: '2025-06-05',
//     donatedAmount: 19000000,
//     targetAmount: 30000000,
//     status: 'active'
//   },
//   {
//     id: 20,
//     name: "Children's Day Gifts",
//     image: 'https://example.com/image20.jpg',
//     startDate: '2025-09-25',
//     donatedAmount: 0,
//     targetAmount: 5000000,
//     status: 'upcoming'
//   }
// ]

const TableDonations = ({ donations }: { donations: Donation[] }) => {
  const navigate = useNavigate()
  const columns: ColumnDef<Donation>[] = [
    {
      id: 'event',
      header: 'Event',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={Banner1}
              alt={row.original.title}
              className="w-14 h-14 rounded object-cover block "
            />
            <div className="capitalize font-semibold">{row.original.title}</div>
          </div>
        )
      }
    },
    {
      accessorKey: 'dateStart',
      header: 'Date',
      cell: ({ row }) => new Date(row.getValue('dateStart')).toLocaleDateString()
    },
    {
      id: 'donatedAmount',
      header: 'Range',
      cell: ({ row }) => {
        const donated = Number(row.original.totalDonated) || 0
        const target = Number(row.original.moneyNeed) || 0
        return (
          <div>
            <span className="flex justify-between">
              <span className="text-sm font-medium text-primary-custom-color">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(donated)}
              </span>
              <span className="text-sm font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(target)}
              </span>
            </span>
            <Progress
              value={(donated / target) * 100}
              className="w-full h-2 rounded-full mt-1 bg-gray-100"
            />
          </div>
        )
      }
    },
    {
      accessorKey: 'eventStatus',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={'secondary'}
          className={cn('text-xs', {
            'bg-green-500/10 text-green-500': row.getValue('eventStatus') === 'active',
            'bg-blue-500/10 text-blue-500': row.getValue('eventStatus') === 'completed',
            'bg-yellow-500/10 text-yellow-500': row.getValue('eventStatus') === 'upcoming',
            'bg-red-500/10 text-red-500': row.getValue('eventStatus') === 'cancelled'
          })}
        >
          {String(row.getValue('eventStatus')).charAt(0).toUpperCase() +
            String(row.getValue('eventStatus')).slice(1)}
        </Badge>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/organization/donations/${row.original.id}`)}
          >
            <EyeOpenIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`Editing campaign ${row.original.id}`)}
          >
            <Pencil2Icon />
          </Button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: donations,
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

export default TableDonations
