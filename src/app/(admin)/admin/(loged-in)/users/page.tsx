"use client"

import { useGetAllUserQuery } from "@/services/userApi"

import { DataTable } from "@/components/auth/table-data"
import { columns } from "@/components/auth/user-column"
import H3 from "@/components/common/h3"

const ManageUsers = () => {
  const { data } = useGetAllUserQuery()

  return (
    <div>
      <H3 className="pl-10">Quản lý người dùng</H3>
      <div className="mt-6">
        <DataTable columns={columns} data={data?.result || []} />
      </div>
    </div>
  )
}

export default ManageUsers
