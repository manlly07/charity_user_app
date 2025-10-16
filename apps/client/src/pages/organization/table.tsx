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
import { useCharities } from '@/hooks'
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

const columns: ColumnDef<TCharity>[] = [
  {
    accessorKey: 'charityName',
    header: 'Campaign Name',
    cell: ({ row }) => <div className="capitalize font-semibold">{row.getValue('charityName')}</div>
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
          'bg-orange-500/10 text-orange-500': row.getValue('eventStatus') === 'UPCOMING',
          'bg-yellow-500/10 text-yellow-500': row.getValue('eventStatus') === 'PENDING',
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
    accessorKey: 'numVolunteerActual',
    header: 'Volunteers',
    cell: ({ row }) => row.getValue('numVolunteerActual')
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (window.location.href = `/organization/charities/${row.original.id}`)}
        >
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
  const [filters, _setFilters] = useState<{ name?: string; from?: string; to?: string }>()
  const { charities } = useCharities(filters)

  const table = useReactTable({
    data: charities,
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
