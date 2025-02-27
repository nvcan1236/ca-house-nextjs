import React from "react"

import { IMotelDetail } from "@/types/motel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Prices = ({
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
      {editedMotel?.prices?.map((price) => (
        <div className="grid grid-cols-4 items-center gap-4" key={price.value}>
          <Label htmlFor="description" className="text-right">
            {price.name}
          </Label>

          <Input
            id="description"
            name="description"
            value={price.value || ""}
            onChange={handleInputChange}
            className="col-span-2"
          />
          <span>/ {price.unit}</span>
        </div>
      ))}
    </div>
  )
}

export default Prices
