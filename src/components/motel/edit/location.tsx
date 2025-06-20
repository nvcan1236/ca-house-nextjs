import React from "react"

import { IMotelDetail } from "@/types/motel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EditLocation = ({
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
          Thành phố
        </Label>

        <Input
          id="description"
          name="description"
          value={editedMotel?.location?.city}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Quận/Huyện
        </Label>

        <Input
          id="description"
          name="description"
          value={editedMotel?.location?.district}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="ward" className="text-right">
          Phường/Xã
        </Label>
        <Input
          id="ward"
          name="ward"
          value={editedMotel?.location?.ward}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="street" className="text-right">
          Tên Đường
        </Label>
        <Input
          id="street"
          name="street"
          value={editedMotel?.location?.street}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="street" className="text-right">
          Địa chỉ khác
        </Label>
        <Input
          id="street"
          name="street"
          value={editedMotel?.location?.other}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="coord" className="text-right">
          Vĩ độ
        </Label>
        <Input
          id="coord"
          name="coord"
          value={editedMotel?.location?.longitude || 0}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="coord" className="text-right">
          Kinh độ
        </Label>
        <Input
          id="coord"
          name="coord"
          value={editedMotel?.location?.latitude || 0}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
    </div>
  )
}

export default EditLocation
