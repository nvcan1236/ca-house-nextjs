import React, { FC, useState } from "react"
import { useSearchMotel } from "@/services/motelApi"
import { SelectProps } from "@radix-ui/react-select"

import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const MotelSelect: FC<SelectProps> = (props) => {
  const [kw, setKw] = useState("")
  const { data } = useSearchMotel(kw)
  const motels = data?.result || []
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn nhà trọ" />
      </SelectTrigger>
      <SelectContent>
        <Input
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          placeholder="Tìm kiếm nhà trọ"
        />
        <ScrollArea className="h-32 mt-2">
          {motels.map((motel) => (
            <SelectItem key={motel.id} value={motel.id}>
              {motel.name}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  )
}

export default MotelSelect
