import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { IMotel, MotelStatus } from "@/types/motel"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<IMotel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => {
      const city = row.original.city
      return <div className="">{city || "-"}</div>
    },
  },
  {
    accessorKey: "district",
    header: "District",
    cell: ({ row }) => {
      const district = row.original.district
      return <div className="">{district || "-"}</div>
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name
      return <div className="text-main-blue-s3 font-semibold">{name}</div>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price (VND)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const price = row.original.price
      return <div>{price.toLocaleString("vi-VN")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: MotelStatus = row.original.status
      switch (status) {
        case "AVAILABLE":
          return (
            <div className="text-green-500 font-semibold bg-green-500/10 px-2 py-1 rounded-md text-center">
              Còn trống
            </div>
          )
        case "BANNED":
          return (
            <div className="text-red-500 font-semibold bg-red-500/10 px-2 py-1 rounded-md text-center">
              Bị cấm
            </div>
          )
        case "DELETED":
          return (
            <div className="text-yellow-500 font-semibold bg-yellow-500/10 px-2 py-1 rounded-md text-center">
              Đã xóa
            </div>
          )
        case "NOT_APPROVED":
          return (
            <div className="text-yellow-500 font-semibold bg-yellow-500/10 px-2 py-1 rounded-md text-center">
              Chưa được duyệt
            </div>
          )
        case "RENTING":
          return (
            <div className="text-blue-500 font-semibold bg-blue-500/10 px-2 py-1 rounded-md text-center">
              Đang cho thuê
            </div>
          )
        case "RESERVED":
          return (
            <div className="text-purple-500 font-semibold bg-purple-500/10 px-2 py-1 rounded-md text-center">
              Đã đặt
            </div>
          )
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Create at
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return <div>{dayjs(createdAt).format("DD/MM/YYYY")}</div>
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Huỷ duyệt</DropdownMenuItem>
            <DropdownMenuItem>Duyệt</DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
