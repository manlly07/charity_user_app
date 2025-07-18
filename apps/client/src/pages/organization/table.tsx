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
import { useMemo } from 'react'
type TCampaign = {
  id: number
  name: string
  status: 'active' | 'completed' | 'upcoming' | 'cancelled'
  startDate: string
  endDate: string
  volunteers: number
}

const campaigns: TCampaign[] = [
  {
    id: 1,
    name: 'Clean the Beach',
    status: 'active',
    startDate: '2025-07-10',
    endDate: '2025-07-20',
    volunteers: 45
  },
  {
    id: 2,
    name: 'Tree Planting Day',
    status: 'completed',
    startDate: '2025-06-01',
    endDate: '2025-06-01',
    volunteers: 120
  },
  {
    id: 3,
    name: 'Blood Donation Drive',
    status: 'upcoming',
    startDate: '2025-08-15',
    endDate: '2025-08-15',
    volunteers: 80
  },
  {
    id: 4,
    name: 'Community Health Camp',
    status: 'cancelled',
    startDate: '2025-07-01',
    endDate: '2025-07-03',
    volunteers: 30
  },
  {
    id: 5,
    name: 'River Cleanup Mission',
    status: 'active',
    startDate: '2025-07-12',
    endDate: '2025-07-18',
    volunteers: 60
  },
  {
    id: 6,
    name: 'Education for All',
    status: 'completed',
    startDate: '2025-04-10',
    endDate: '2025-04-30',
    volunteers: 150
  },
  {
    id: 7,
    name: 'Senior Care Outreach',
    status: 'upcoming',
    startDate: '2025-09-01',
    endDate: '2025-09-07',
    volunteers: 50
  },
  {
    id: 8,
    name: 'Animal Shelter Support',
    status: 'active',
    startDate: '2025-07-05',
    endDate: '2025-07-25',
    volunteers: 35
  },
  {
    id: 9,
    name: 'Disaster Relief Training',
    status: 'completed',
    startDate: '2025-05-10',
    endDate: '2025-05-20',
    volunteers: 100
  },
  {
    id: 10,
    name: 'School Supply Distribution',
    status: 'cancelled',
    startDate: '2025-07-15',
    endDate: '2025-07-16',
    volunteers: 25
  },
  {
    id: 11,
    name: 'Food for Homeless',
    status: 'upcoming',
    startDate: '2025-08-05',
    endDate: '2025-08-10',
    volunteers: 75
  },
  {
    id: 12,
    name: 'Public Park Revamp',
    status: 'active',
    startDate: '2025-07-14',
    endDate: '2025-07-22',
    volunteers: 90
  }
]

const columns: ColumnDef<TCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }) => <div className="capitalize font-semibold">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={'secondary'}
        className={cn('text-xs', {
          'bg-green-500/10 text-green-500': row.getValue('status') === 'active',
          'bg-blue-500/10 text-blue-500': row.getValue('status') === 'completed',
          'bg-yellow-500/10 text-yellow-500': row.getValue('status') === 'upcoming',
          'bg-red-500/10 text-red-500': row.getValue('status') === 'cancelled'
        })}
      >
        {String(row.getValue('status')).charAt(0).toUpperCase() +
          String(row.getValue('status')).slice(1)}
      </Badge>
    )
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => new Date(row.getValue('startDate')).toLocaleDateString()
  },
  {
    accessorKey: 'volunteers',
    header: 'Volunteers',
    cell: ({ row }) => row.getValue('volunteers')
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => alert(`Viewing campaign ${row.id}`)}>
          <EyeOpenIcon />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => alert(`Editing campaign ${row.id}`)}>
          <Pencil2Icon />
        </Button>
      </div>
    )
  }
]

const TableOrganization = () => {
  const table = useReactTable({
    data: campaigns,
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

export default TableOrganization
