import React, { useState } from "react"
import { SearchIcon, XCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDebouce } from "@/hooks/use-debounce"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DrawerDialogFilter } from "./drawer-dialog-filter"
import SearchResult from "./search-result"

const SearchInput = () => {
  const [keyword, setKeyword] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [showResult, setShowResult] = useState(false)

  useDebouce(() => {
    setKeyword(searchInput)
  }, [searchInput])

  return (
    <div className="md:h-[52px] h-[40px] flex w-full items-center gap-1 pl-4 pr-2 border-2 rounded-full bg-background border-main-blue-s3">
      <DrawerDialogFilter />

      <div className="flex-1 relative">
        <Input
          placeholder="Địa chỉ trọ muốn tìm kiếm ..."
          className=" border-none bg-transparent"
          accept="enter"
          onFocus={() => setShowResult(true)}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSearchInput("")}
          className={cn("absolute top-1 right-0 rounded-full size-8", {
            hidden: !searchInput,
          })}
        >
          <XCircleIcon size={16} className="text-gray-500" />
        </Button>
        <SearchResult
          hidden={!keyword.trim() || !showResult}
          keyword={keyword}
          className="absolute top-full mt-3 left-0 right-0 z-10"
        />
      </div>

      <Button className="rounded-full" variant={"ghost"} size={"icon"}>
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}

export default SearchInput
