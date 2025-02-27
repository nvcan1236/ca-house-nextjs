import React from "react"

import { IMotelDetail } from "@/types/motel"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
          Name
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
          Area
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
          Price
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
          Type
        </Label>
        <Input
          id="type"
          name="type"
          value={editedMotel?.type}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right">
          Description
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
          Images
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
