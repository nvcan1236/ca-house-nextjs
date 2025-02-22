"use client"

import { useGetMotels } from "@/services/motelApi"
import useFilterStore from "@/stores/filter-store"

import H3 from "@/components/common/h3"
import { DataTable } from "@/components/motel/table-data"
import { columns } from "@/components/motel/motel-column"

const ApprovePage = () => {
  const { roomType, amenities, maxPrice, minPrice, applied } = useFilterStore()
  const { data } = useGetMotels({
    page: 1,
    size: 100,
    filter: { roomType, amenities, maxPrice, minPrice, applied },
    isAdmin: true,
  })
  const motelNotApproved = data?.result.data.filter(
    (motel) => motel.status == "NOT_APPROVED"
  )
  return (
    <div className="w-full">
      <H3 className="pl-10">Danh sách trọ chờ duyệt</H3>
      <DataTable columns={columns} data={motelNotApproved || []} />
    </div>
  )
}
export default ApprovePage
