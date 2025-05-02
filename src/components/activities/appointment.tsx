"use client"

import { useRouter } from "next/navigation"
import { useGetAppointmentsByUser } from "@/services/motelUtilApi"
import { HouseIcon } from "lucide-react"

import { appointmentStatus } from "@/lib/predefined-data"
import { formatDate, formatDateTime } from "@/lib/utils"
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

const Appointment = () => {
  const router = useRouter()
  const { data } = useGetAppointmentsByUser()
  const appointments = data?.result

  return (
    <ScrollArea className="h-[400px]">
      <Table className="bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Ngày hẹn</TableHead>
            <TableHead>Trọ</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments?.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{formatDateTime(app.createdAt)}</TableCell>
              <TableCell>{formatDate(app.date)}</TableCell>
              <TableCell>{app.motel.name}</TableCell>
              <TableCell
                className={`
                  ${app.status == "ACCEPT" && "text-green-700"}
                  ${app.status == "DENY" && "text-red-600"}
                  ${app.status == "PENDING" && "text-yellow-600"} font-medium
                  `}
              >
                {appointmentStatus[app.status]}
              </TableCell>
              <TableCell>
                <CustomTooltip label="Xem chi tiết trọ">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      router.push(`/motels/${app.motel.id}`)
                    }}
                  >
                    <HouseIcon size={16} />
                  </Button>
                </CustomTooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

export default Appointment
