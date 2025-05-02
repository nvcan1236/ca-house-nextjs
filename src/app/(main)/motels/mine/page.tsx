"use client"

import { useGetMotelByUser } from "@/services/motelApi"
import {
  useChangeAppointmentStatus,
  useGetAppointmentsByOwner,
} from "@/services/motelUtilApi"
import { useGetCurrentUserQuery } from "@/services/userApi"
import { EllipsisIcon } from "lucide-react"

import { appointmentStatus } from "@/lib/predefined-data"
import { cn, formatDate, formatDateTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ProtectedRoute from "@/components/auth/protected-route"
import { CreateMotelButton } from "@/components/common/create-motel-button"
import DecorativeHeading from "@/components/common/decorative-heading"
import H3 from "@/components/common/h3"
import EditMotelDialog from "@/components/motel/edit/edit-motel-dialog"
import MotelCard from "@/components/motel/motel-card"

const MyMotelsPage = () => {
  const { data } = useGetCurrentUserQuery()
  const { data: ownerAppointment } = useGetAppointmentsByOwner()
  const appointments = ownerAppointment?.result
  const userId = data?.result.username
  const { data: motelsData } = useGetMotelByUser(userId || "")
  const motels = motelsData?.result
  const { mutate: changeStatus } = useChangeAppointmentStatus()
  return (
    <ProtectedRoute>
      <section>
        <div className="flex justify-between items-center">
          <DecorativeHeading>Phòng của bạn</DecorativeHeading>
          <CreateMotelButton />
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-4">
          {motels?.length === 0 && (
            <p className="py-6 ml-10 text-slate-600 ">
              (Bạn chưa tạo phòng trọ nào)
            </p>
          )}
          {motels?.map((motel) => (
            <EditMotelDialog motel={motel} key={motel.id}>
              <div
                className={cn("relative", {
                  "": !motel.approved,
                })}
              >
                <MotelCard motel={motel} />
                {!motel.approved ? (
                  <Badge className="top-2 right-2 absolute bg-main-yellow px-4 py-1">
                    Đang chờ duyệt
                  </Badge>
                ) : (
                  <Badge className="top-2 right-2 absolute bg-green-600 px-4 py-1">
                    Đã duyệt
                  </Badge>
                )}
              </div>
            </EditMotelDialog>
          ))}
          {motels?.length == 0 && (
            <p className="py-6 ml-10 text-slate-600 ">
              (Bạn chưa tạo phòng trọ nào)
            </p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <H3>Yêu cầu xem phòng</H3>
        <div>
          <Table className="mt-6 bg-background">
            <TableHeader>
              <TableRow>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày hẹn</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments?.length == 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-slate-600 "
                  >
                    ( Chưa có lịch đặt phòng nào )
                  </TableCell>
                </TableRow>
              )}
              {appointments?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{formatDateTime(app.createdAt)}</TableCell>
                  <TableCell>{formatDate(app.date)}</TableCell>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                          <EllipsisIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        align="start"
                        className="w-fit p-1"
                      >
                        <ul className="w-[120px]">
                          <li
                            className="p-2 cursor-pointer text-green-700 hover:bg-main-blue-t9"
                            onClick={() =>
                              changeStatus({
                                appointmentId: app.id,
                                status: "ACCEPT",
                              })
                            }
                          >
                            Chấp nhận
                          </li>
                          <li
                            className="p-2 cursor-pointer text-destructive hover:bg-main-blue-t9"
                            onClick={() =>
                              changeStatus({
                                appointmentId: app.id,
                                status: "DENY",
                              })
                            }
                          >
                            Từ chối
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-10">
        <H3>Yêu cầu cọc phòng</H3>
        <div>
          <Table className="mt-6 bg-background">
            <TableHeader>
              <TableRow>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày hẹn</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments?.length == 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-slate-600 "
                  >
                    ( Chưa có lịch đặt phòng nào )
                  </TableCell>
                </TableRow>
              )}
              {appointments?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{formatDateTime(app.createdAt)}</TableCell>
                  <TableCell>{formatDate(app.date)}</TableCell>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                          <EllipsisIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        align="start"
                        className="w-fit p-1"
                      >
                        <ul className="w-[120px]">
                          <li
                            className="p-2 cursor-pointer text-green-700 hover:bg-main-blue-t9"
                            onClick={() =>
                              changeStatus({
                                appointmentId: app.id,
                                status: "ACCEPT",
                              })
                            }
                          >
                            Chấp nhận
                          </li>
                          <li
                            className="p-2 cursor-pointer text-destructive hover:bg-main-blue-t9"
                            onClick={() =>
                              changeStatus({
                                appointmentId: app.id,
                                status: "DENY",
                              })
                            }
                          >
                            Từ chối
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </ProtectedRoute>
  )
}

export default MyMotelsPage
