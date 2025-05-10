"use client"

import { useRouter } from "next/navigation"
import { useGetReservationsByUser } from "@/services/motelUtilApi"
import { HouseIcon } from "lucide-react"

import { DepositStatus } from "@/types/motel"
import { depositStatus } from "@/lib/predefined-data"
import { formatDateTime } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import CustomTooltip from "../common/tooltip"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"

const Deposit = () => {
  const { data } = useGetReservationsByUser(1)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const depostits = data?.result.data

  return (
    <Table className="bg-background ">
      <ScrollArea className="h-[400px]">
        <TableHeader>
          <TableRow>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Thời gian (ngày)</TableHead>
            <TableHead>Số tiền(VND)</TableHead>
            <TableHead>Trọ</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depostits?.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell>{formatDateTime(dep.createdAt)}</TableCell>
              <TableCell>{dep.duration}</TableCell>
              <TableCell className="text-right">
                {Number(dep.amount).toLocaleString()}
              </TableCell>
              <TableCell>{dep.motel?.name}</TableCell>
              <TableCell
                className={`
                    ${dep.status == "PAYMENT_SUCCESS" && "text-green-700"}
                    ${dep.status == "PAYMENT_FAIL" && "text-red-600"}
                    ${dep.status == "PENDING" && "text-yellow-600"} font-medium
                  `}
              >
                {depositStatus[dep.status as DepositStatus]}
              </TableCell>
              <TableCell>
                <CustomTooltip label="Xem chi tiết trọ">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      router.push(`/motels/${dep.motel?.id}`)
                    }}
                  >
                    <HouseIcon size={16} />
                  </Button>
                </CustomTooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  )
}

export default Deposit
