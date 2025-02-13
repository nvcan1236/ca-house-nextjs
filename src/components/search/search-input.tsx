import React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DrawerDialogFilter } from "./drawer-dialog-filter"

const SearchInput = () => {
  return (
    <div className="md:h-[52px] h-[40px] flex w-full items-center gap-1 pl-4 pr-2 border-2 rounded-full bg-background border-main-blue-s3">
      <DrawerDialogFilter />

      <Input
        placeholder="Địa chỉ trọ muốn tìm kiếm ..."
        className="flex-1 border-none bg-transparent"
        accept="enter"
      />

      <Button className="rounded-full" variant={"ghost"} size={"icon"}>
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}

export default SearchInput
