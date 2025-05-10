import { useState } from "react"
import { usePostFilterStore } from "@/stores/post-filter-store"

import { postType } from "@/lib/predefined-data"

import DatePickerNoForm from "../common/date-picker-no-form"
import H3 from "../common/h3"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { SearchIcon } from "lucide-react"

const PostFilter = () => {
  const {
    filter: filterPost,
    setFilter: handleCheckType,
    date,
    setDate,
    setApplied,
    setKeyword,
    sort,
    setSort,
  } = usePostFilterStore()
  const [search, setSearch] = useState("")
  return (
    <div className={`rounded-xl border bg-background py-4 px-6 `}>
      <H3 className="mb-4">Tìm kiếm</H3>
      <div className="flex  gap-2 items-center">
        <Input
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant={"secondary"}
          onClick={() => setKeyword(search)}
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>

      <H3 className="mt-6">Lọc bài viết</H3>
      <div className="space-y-4 mt-2">
        <div>
          <Label>Loại bài đăng</Label>
          <div className="ml-3 mt-2 flex flex-col gap-3">
            {Object.keys(postType).map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  checked={filterPost.includes(type as keyof typeof postType)}
                  onCheckedChange={() =>
                    handleCheckType(type as keyof typeof postType)
                  }
                  id={type}
                />
                <Label htmlFor={type}>
                  {postType[type as keyof typeof postType]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Ngày đăng</Label>
          <DatePickerNoForm
            value={date}
            className="mt-2"
            onChange={(value) => setDate(value || new Date())}
          />
        </div>

        <div>
          <Label className="inline-block mb-2">Sắp xếp</Label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as "newest" | "oldest")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          size={"sm"}
          className="w-full mt-6"
          variant={"secondary"}
          onClick={() => setApplied()}
        >
          Lọc
        </Button>
      </div>
    </div>
  )
}

export default PostFilter
