import React from "react"

import { IMotelDetail } from "@/types/motel"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ImageSlider from "@/components/common/image-slider"

const General = ({
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
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="name" className="text-right">
          Tên
        </Label>
        <Input
          id="name"
          name="name"
          value={editedMotel?.name}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="area" className="text-right">
          Diện tích (m²)
        </Label>
        <Input
          id="area"
          name="area"
          type="number"
          value={editedMotel?.area}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="price" className="text-right">
          Giá
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={editedMotel?.price}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Loại
        </Label>
        <Select
          value={editedMotel?.type}
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "type", value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Loại nhà trọ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SINGLE_ROOM">Phòng đơn</SelectItem>
            <SelectItem value="WHOLE_HOUSE">Nhà nguyên căn</SelectItem>
            <SelectItem value="APARTMENT">Căn hộ</SelectItem>
            <SelectItem value="DORMITORY">Ký túc xá</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right">
          Mô tả
        </Label>
        <Textarea
          id="description"
          name="description"
          value={editedMotel?.description}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4 ">
        <Label htmlFor="description" className="text-right">
          Hình ảnh trọ
        </Label>
        <div className="col-span-3">
          <ImageSlider images={editedMotel?.images || []} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-4 items-start gap-4 ">
        <Label htmlFor="description" className="text-right">
          Duyệt
        </Label>
        <div className="col-span-3">
          <Checkbox checked={editedMotel?.approved}></Checkbox>
        </div>
      </div>
    </div>
  )
}

export default General
