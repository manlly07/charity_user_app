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
import { CharityEventListResponse } from '@/hooks/useCharitiesAdmin'
import { cn } from '@/lib/utils'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

interface TableCharitiesProps {
  charities: CharityEventListResponse[]
}

const TableCharities = ({ charities }: TableCharitiesProps) => {
  const navigate = useNavigate()
  const columns: ColumnDef<CharityEventListResponse>[] = [
    {
      accessorKey: 'id',
      header: 'Charity Event',
      cell: ({ row }) => <span>{row.getValue('id') ? `ORG${row.getValue('id')}` : '-'}</span>
    },
    {
      accessorKey: 'organizationName',
      header: 'Charity Name',
      cell: ({ row }) => row.getValue('organizationName') || '-'
    },
    {
      accessorKey: 'organizationName',
      header: 'Organizing Name',
      cell: ({ row }) => row.getValue('organizationName') || '-'
    },
    {
      accessorKey: 'destination',
      header: 'Destination',
      cell: ({ row }) => row.getValue('destination') || '-'
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
            'bg-yellow-500/10 text-yellow-500': row.getValue('eventStatus') === 'UPCOMNING',
            'bg-orange-500/10 text-orange-500': row.getValue('eventStatus') === 'CLOSED',
            'bg-red-500/10 text-red-500': row.getValue('eventStatus') === 'INACTIVE'
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
            onClick={() => navigate(`/admin/charities/${row.original.id}`)}
          >
            <EyeOpenIcon />
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
    data: charities,
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
