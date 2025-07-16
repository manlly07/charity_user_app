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
import { EyeOpenIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

type TCharityUser = {
  id: number
  name: string
  email: string
  phone: string
  register: string
}

const charityUsers: TCharityUser[] = [
  {
    id: 1,
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    register: '2025-01-10'
  },
  {
    id: 2,
    name: 'Tran Thi B',
    email: 'tranthib@example.com',
    phone: '0912345678',
    register: '2025-01-12'
  },
  {
    id: 3,
    name: 'Le Van C',
    email: 'levanc@example.com',
    phone: '0923456789',
    register: '2025-01-15'
  },
  {
    id: 4,
    name: 'Pham Thi D',
    email: 'phamthid@example.com',
    phone: '0934567890',
    register: '2025-01-20'
  },
  {
    id: 5,
    name: 'Hoang Van E',
    email: 'hoangvane@example.com',
    phone: '0945678901',
    register: '2025-01-22'
  },
  {
    id: 6,
    name: 'Do Thi F',
    email: 'dothif@example.com',
    phone: '0956789012',
    register: '2025-01-25'
  },
  {
    id: 7,
    name: 'Nguyen Van G',
    email: 'nguyenvang@example.com',
    phone: '0967890123',
    register: '2025-01-27'
  },
  {
    id: 8,
    name: 'Tran Thi H',
    email: 'tranthih@example.com',
    phone: '0978901234',
    register: '2025-01-29'
  },
  {
    id: 9,
    name: 'Le Van I',
    email: 'levani@example.com',
    phone: '0989012345',
    register: '2025-02-01'
  },
  {
    id: 10,
    name: 'Pham Thi J',
    email: 'phamthij@example.com',
    phone: '0990123456',
    register: '2025-02-03'
  },
  {
    id: 11,
    name: 'Nguyen Van K',
    email: 'nguyenvank@example.com',
    phone: '0902345678',
    register: '2025-02-06'
  },
  {
    id: 12,
    name: 'Tran Thi L',
    email: 'tranthil@example.com',
    phone: '0913456789',
    register: '2025-02-08'
  },
  {
    id: 13,
    name: 'Le Van M',
    email: 'levanm@example.com',
    phone: '0924567890',
    register: '2025-02-10'
  },
  {
    id: 14,
    name: 'Pham Thi N',
    email: 'phamthin@example.com',
    phone: '0935678901',
    register: '2025-02-13'
  },
  {
    id: 15,
    name: 'Hoang Van O',
    email: 'hoangvano@example.com',
    phone: '0946789012',
    register: '2025-02-15'
  },
  {
    id: 16,
    name: 'Do Thi P',
    email: 'dothip@example.com',
    phone: '0957890123',
    register: '2025-02-17'
  },
  {
    id: 17,
    name: 'Nguyen Van Q',
    email: 'nguyenvanq@example.com',
    phone: '0968901234',
    register: '2025-02-20'
  },
  {
    id: 18,
    name: 'Tran Thi R',
    email: 'tranthir@example.com',
    phone: '0979012345',
    register: '2025-02-22'
  },
  {
    id: 19,
    name: 'Le Van S',
    email: 'levans@example.com',
    phone: '0980123456',
    register: '2025-02-25'
  },
  {
    id: 20,
    name: 'Pham Thi T',
    email: 'phamthit@example.com',
    phone: '0991234567',
    register: '2025-02-28'
  }
]

const TableCharityUsers = () => {
  const navigate = useNavigate()
  const columns: ColumnDef<TCharityUser>[] = [
    {
      accessorKey: 'name',
      header: 'Full Name',
      cell: ({ row }) => row.getValue('name')
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.getValue('email')
    },
    {
      accessorKey: 'phone',
      header: 'PhonePhone Number',
      cell: ({ row }) => row.getValue('phone')
    },
    {
      accessorKey: 'register',
      header: 'Registration Date',
      cell: ({ row }) => row.getValue('register')
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/organization/charities/${row.id}`)}
          >
            <EyeOpenIcon />
          </Button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: charityUsers,
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
