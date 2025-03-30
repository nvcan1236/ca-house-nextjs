/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import {
  BanknoteIcon,
  PawPrintIcon,
  ReceiptTextIcon,
  UserIcon,
} from "lucide-react"

import { IMotelDetail } from "@/types/motel"
import { definedJobs } from "@/lib/predefined-data"
import { Label } from "@/components/ui/label"
import DecorativeHeading from "@/components/common/decorative-heading"

const DetailMotelRequirement = ({
  detailMotel,
}: {
  detailMotel: IMotelDetail
}) => {
  if (!detailMotel?.requirement) return
  return (
    <div>
      <DecorativeHeading>Yêu cầu từ khi thuê</DecorativeHeading>
      <div className="mt-4 flex flex-col md:flex-row gap-x-4 gap-y-6 px-8 py-6 bg-white rounded-xl border border-main-yellow-t6 shadow">
        <div className="space-y-6 flex-1">
          <div className="flex items-center gap-2">
            <Label className="flex gap-4 items-center">
              <PawPrintIcon /> Nuôi thú cưng:
            </Label>
            <span className="font-semibold">
              {detailMotel.requirement.allowPet
                ? "Được phép"
                : "Không được phép"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Label className="flex gap-4 items-center">
              <ReceiptTextIcon /> Hợp đồng tối thiểu:
            </Label>
            <span className="font-semibold">
              {detailMotel.requirement.contractAmount} tháng
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Label className="flex gap-4 items-center">
              <BanknoteIcon /> Số tiền đặt cọc:
            </Label>
            <span className="font-semibold">
              {detailMotel.requirement.deposit.toLocaleString("vi")}đ
            </span>
          </div>
        </div>

        <div className="flex-1">
          <Label className="flex gap-4 items-center">
            <UserIcon /> Đối tượng ưu tiên cho thuê:
          </Label>
          <ul className="mt-2 space-y-1 list-disc pl-10">
            {detailMotel.requirement.jobs.map((job) => (
              <li key={job} className="font-semibold text-gray-700">
                {definedJobs[job]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelRequirement
