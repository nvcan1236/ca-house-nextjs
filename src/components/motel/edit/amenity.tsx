import React from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { IMotelDetail } from "@/types/motel"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const Amenity = ({
  editedMotel,
}: {
  editedMotel?: Partial<IMotelDetail>
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Label htmlFor="description" className="text-right">
          Amenity
        </Label>
        <Button variant={"secondary"} size={"sm"}>
          <PlusIcon className="mr-2" /> Thêm tiện nghi
        </Button>
      </div>
      {editedMotel?.amenities?.map((amenity) => (
        <div
          key={amenity.name}
          className="bg-main-blue-t9 border w-fit p-2 rounded-md text-main-blue-s3 px-4 mt-3 "
        >
          (<span className="text-sm">{amenity.type}</span>) - {amenity.name}{" "}
          <XIcon className="inline-block cursor-pointer" size={20} />
        </div>
      ))}
    </div>
  )
}

export default Amenity
