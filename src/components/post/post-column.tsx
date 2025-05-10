import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { MoreHorizontal } from "lucide-react"

import { IPost } from "@/types/post"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<IPost>[] = [
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
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.original.content
      return <div className="max-w-[400px] line-clamp-2">{content}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type
      switch (type) {
        case "FIND_ROOM":
          return <div className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md font-semibold text-center">Tìm phòng</div>
        case "PASS_ROOM":
          return <div className="text-green-500 bg-green-500/10 px-2 py-1 rounded-md font-semibold text-center">Pass phòng</div>
        case "FIND_ROOMMATE":
          return <div className="text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md font-semibold text-center">Tìm bạn ở</div>
        case "REVIEW":
          return <div className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md font-semibold text-center">Đánh giá</div>
      }
    },
  },
  {
    accessorKey: "comment_count",
    header: "Comment count",
  },
  {
    accessorKey: "react_count",
    header: "React count",
  },
  {
    accessorKey: "owner",
    header: "Create by",
    cell: ({ row }) => {
      const createBy = row.original.owner.firstName + " " + row.original.owner.lastName
      return <div className="text-main-blue-s3 font-semibold">{createBy}</div>
    },
  },
  {
    accessorKey: "create_at",
    header: "Create at",
    cell: ({ row }) => {
      const createdAt = row.original.create_at
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
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
