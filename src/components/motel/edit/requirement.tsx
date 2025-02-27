import React from "react"

import { IMotelDetail } from "@/types/motel"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Requirement = ({
  editedMotel,
  handleInputChange,
}: {
  editedMotel?: Partial<IMotelDetail>
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Nuôi thú cưng
        </Label>
        <Checkbox checked={editedMotel?.requirement?.allowPet}></Checkbox>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractAmount" className="text-right">
          Hợp đồng
        </Label>
        <Input
          id="contractAmount"
          name="contractAmount"
          value={editedMotel?.requirement?.contractAmount}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractAmount" className="text-right">
          Cọc trước
        </Label>
        <Input
          id="contractAmount"
          name="contractAmount"
          value={editedMotel?.requirement?.deposit}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractAmount" className="text-right">
          Đối tượng
        </Label>
        <Input
          id="contractAmount"
          name="contractAmount"
          value={editedMotel?.requirement?.jobs.join(", ")}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractAmount" className="text-right">
          Khác
        </Label>
        <Input
          id="contractAmount"
          name="contractAmount"
          value={editedMotel?.requirement?.other || ""}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
    </div>
  )
}

export default Requirement
