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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
type TCharityStatus = 'active' | 'inactive' | 'upcoming' | 'completed'

type TCharity = {
  id: number
  charityName: string
  description: string
  destination: string
  dateStart: string
  dateEnd: string
  numVolunteerRequire: number
  numVolunteerActual?: number
  note?: string
  eventStatus: TCharityStatus
  pic: string
}

// const charityList: TCharity[] = [
//   {
//     id: 1,
//     name: 'Hope for All',
//     image: 'https://via.placeholder.com/150?text=Hope+for+All',
//     location: 'Hanoi, Vietnam',
//     startDate: '2025-07-01',
//     endDate: '2025-08-15',
//     status: 'active'
//   },
//   {
//     id: 2,
//     name: 'Clean Water Project',
//     image: 'https://via.placeholder.com/150?text=Clean+Water',
//     location: 'Da Nang, Vietnam',
//     startDate: '2025-05-10',
//     endDate: '2025-06-10',
//     status: 'completed'
//   },
//   {
//     id: 3,
//     name: 'Books for Children',
//     image: 'https://via.placeholder.com/150?text=Books+for+Children',
//     location: 'Ho Chi Minh City, Vietnam',
//     startDate: '2025-09-01',
//     endDate: '2025-09-30',
//     status: 'upcoming'
//   },
//   {
//     id: 4,
//     name: 'Health Check for Elderly',
//     image: 'https://via.placeholder.com/150?text=Health+Check',
//     location: 'Can Tho, Vietnam',
//     startDate: '2025-06-01',
//     endDate: '2025-06-15',
//     status: 'inactive'
//   },
//   {
//     id: 5,
//     name: 'Feeding the Homeless',
//     image: 'https://via.placeholder.com/150?text=Feeding+Homeless',
//     location: 'Hai Phong, Vietnam',
//     startDate: '2025-07-20',
//     endDate: '2025-08-05',
//     status: 'active'
//   },
//   {
//     id: 6,
//     name: 'Education for All',
//     image: 'https://via.placeholder.com/150?text=Education+for+All',
//     location: 'Hue, Vietnam',
//     startDate: '2025-10-01',
//     endDate: '2025-10-31',
//     status: 'upcoming'
//   },
//   {
//     id: 7,
//     name: 'Warm Clothes for Winter',
//     image: 'https://via.placeholder.com/150?text=Warm+Clothes',
//     location: 'Lao Cai, Vietnam',
//     startDate: '2024-12-01',
//     endDate: '2025-01-15',
//     status: 'completed'
//   },
//   {
//     id: 8,
//     name: 'Orphanage Support',
//     image: 'https://via.placeholder.com/150?text=Orphanage+Support',
//     location: 'Quang Ninh, Vietnam',
//     startDate: '2025-06-15',
//     endDate: '2025-07-15',
//     status: 'inactive'
//   },
//   {
//     id: 9,
//     name: 'Medical Mission',
//     image: 'https://via.placeholder.com/150?text=Medical+Mission',
//     location: 'Thanh Hoa, Vietnam',
//     startDate: '2025-08-01',
//     endDate: '2025-08-20',
//     status: 'active'
//   },
//   {
//     id: 10,
//     name: 'Flood Relief Fund',
//     image: 'https://via.placeholder.com/150?text=Flood+Relief',
//     location: 'Nghe An, Vietnam',
//     startDate: '2025-03-01',
//     endDate: '2025-04-01',
//     status: 'completed'
//   },
//   {
//     id: 11,
//     name: 'Green City Campaign',
//     image: 'https://via.placeholder.com/150?text=Green+City',
//     location: 'Da Lat, Vietnam',
//     startDate: '2025-07-01',
//     endDate: '2025-07-30',
//     status: 'active'
//   },
//   {
//     id: 12,
//     name: 'Blood Donation Drive',
//     image: 'https://via.placeholder.com/150?text=Blood+Donation',
//     location: 'Vinh, Vietnam',
//     startDate: '2025-08-05',
//     endDate: '2025-08-07',
//     status: 'upcoming'
//   },
//   {
//     id: 13,
//     name: 'Child Nutrition Support',
//     image: 'https://via.placeholder.com/150?text=Child+Nutrition',
//     location: 'Bac Ninh, Vietnam',
//     startDate: '2025-06-01',
//     endDate: '2025-06-30',
//     status: 'inactive'
//   },
//   {
//     id: 14,
//     name: 'Eye Care for Kids',
//     image: 'https://via.placeholder.com/150?text=Eye+Care',
//     location: 'Nam Dinh, Vietnam',
//     startDate: '2025-09-10',
//     endDate: '2025-09-20',
//     status: 'upcoming'
//   },
//   {
//     id: 15,
//     name: 'Disaster Recovery',
//     image: 'https://via.placeholder.com/150?text=Disaster+Recovery',
//     location: 'Nha Trang, Vietnam',
//     startDate: '2025-04-01',
//     endDate: '2025-04-30',
//     status: 'completed'
//   },
//   {
//     id: 16,
//     name: 'Tech for Charity',
//     image: 'https://via.placeholder.com/150?text=Tech+for+Charity',
//     location: 'Binh Duong, Vietnam',
//     startDate: '2025-07-10',
//     endDate: '2025-08-10',
//     status: 'active'
//   },
//   {
//     id: 17,
//     name: 'Mental Health Awareness',
//     image: 'https://via.placeholder.com/150?text=Mental+Health',
//     location: 'Long An, Vietnam',
//     startDate: '2025-08-25',
//     endDate: '2025-09-05',
//     status: 'upcoming'
//   },
//   {
//     id: 18,
//     name: 'Village Electricity',
//     image: 'https://via.placeholder.com/150?text=Village+Electricity',
//     location: 'Kon Tum, Vietnam',
//     startDate: '2025-05-15',
//     endDate: '2025-06-15',
//     status: 'completed'
//   },
//   {
//     id: 19,
//     name: 'School Renovation',
//     image: 'https://via.placeholder.com/150?text=School+Renovation',
//     location: 'Quang Tri, Vietnam',
//     startDate: '2025-07-20',
//     endDate: '2025-08-20',
//     status: 'active'
//   },
//   {
//     id: 20,
//     name: 'Elderly Support Network',
//     image: 'https://via.placeholder.com/150?text=Elderly+Support',
//     location: 'Soc Trang, Vietnam',
//     startDate: '2025-09-01',
//     endDate: '2025-09-30',
//     status: 'upcoming'
//   }
// ]

interface TableCharitiesProps {
  charityList: TCharity[]
}

const TableCharities = ({ charityList }: TableCharitiesProps) => {
  const navigate = useNavigate()

  const columns: ColumnDef<TCharity>[] = [
    {
      id: 'event',
      header: 'Event',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original.pic}
              alt={row.original.charityName}
              className="w-14 h-14 rounded object-cover block "
            />
            <div className="capitalize font-semibold">{row.original.charityName}</div>
          </div>
        )
      }
    },
    {
      accessorKey: 'destination',
      header: 'Location',
      cell: ({ row }) => row.getValue('destination')
    },
    {
      accessorKey: 'eventStatus',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={'secondary'}
          className={cn('text-xs', {
            'bg-green-500/10 text-green-500': row.getValue('eventStatus') === 'ACTIVE',
            'bg-blue-500/10 text-blue-500': row.getValue('eventStatus') === 'COMPLETED',
            'bg-yellow-500/10 text-yellow-500': row.getValue('eventStatus') === 'PENDING',
            'bg-orange-500/10 text-orange-500': row.getValue('eventStatus') === 'UPCOMING',
            'bg-red-500/10 text-red-500': row.getValue('eventStatus') === 'CANCELLED'
          })}
        >
          {String(row.getValue('eventStatus')).charAt(0).toUpperCase() +
            String(row.getValue('eventStatus')).slice(1)}
        </Badge>
      )
    },
    {
      accessorKey: 'dateStart',
      header: 'Start Date',
      cell: ({ row }) => new Date(row.getValue('dateStart')).toLocaleDateString()
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/organization/charities/${row.original.id}`)}
          >
            <EyeOpenIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/organization/charities/update/${row.original.id}`)}
          >
            <Pencil2Icon />
          </Button>
        </div>
      )
    }
  ]

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  })

  const table = useReactTable({
    data: charityList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination
    }
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

export default TableCharities
