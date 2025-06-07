import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { User } from "@/types/auth"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import AssignAdminDialog from "./assign-admin-dialog"

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "firstName",
    header: "Firstname",
  },
  {
    accessorKey: "lastName",
    header: "Lastname",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const roles = row.original.roles
      return (
        <div className="text-main-blue-s3 font-semibold space-x-2">
          {roles.map((role) => (
            <Badge
              key={role}
              variant="outline"
              className={cn("text-center", {
                "text-red-500 bg-red-500/10 px-2 py-1": role === "ADMIN",
                "text-yellow-500 bg-yellow-500/10 px-2 py-1": role === "USER",
                "text-green-500 bg-green-500/10 px-2 py-1": role === "OWNER",
              })}
            >
              {role}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <AssignAdminDialog userId={row.original.username} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
