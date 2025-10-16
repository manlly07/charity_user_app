import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { VolunteerListResponse } from '@/hooks/useVolunteer'
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
  volunteers: VolunteerListResponse[]
}

const TableVolunteers = ({ volunteers }: TableCharitiesProps) => {
  const navigate = useNavigate()

  const columns: ColumnDef<VolunteerListResponse>[] = [
    {
      id: 'event',
      header: 'Volunteer',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="flex gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={row.original.pic || undefined} alt={row.original.fullName} />
                <AvatarFallback>{row.original.fullName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-base font-medium">{row.original.fullName}</p>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.getValue('email')
    },
    {
      accessorKey: 'eventStatus',
      header: 'Status',
      cell: ({ row }) => {
        const { banned, active } = row.original

        let text = ''
        let colorClass = ''

        if (banned) {
          text = 'Banned'
          colorClass = 'bg-red-500/10 text-red-500'
        } else if (active) {
          text = 'Active'
          colorClass = 'bg-green-500/10 text-green-500'
        } else {
          text = 'Inactive'
          colorClass = 'bg-orange-500/10 text-orange-500'
        }

        return (
          <Badge variant="secondary" className={cn('text-xs', colorClass)}>
            {text}
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/admin/volunteer/${row.original.id}`)}
          >
            <EyeOpenIcon />
          </Button>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`Editing campaign ${row.original.id}`)}
          >
            <Pencil2Icon />
          </Button> */}
        </div>
      )
    }
  ]

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  })

  const table = useReactTable({
    data: volunteers,
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

export default TableVolunteers
