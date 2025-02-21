import { usePostFilterStore } from "@/stores/post-filter-store"

import { postType } from "@/lib/predefined-data"

import H3 from "../common/h3"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const PostFilter = () => {
  const { filter: filterPost, setFilter: handleCheckType } =
    usePostFilterStore()
  return (
    <div className={`rounded-xl border bg-background py-4 px-6 `}>
      <H3 className="mb-4">Lọc bài viết</H3>
      <div>
        <Label>Loại bài đăng</Label>
        <div className="ml-3 mt-4 flex flex-col gap-3">
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
        <Button size={"sm"} className="w-full mt-6" variant={"secondary"}>
          Lọc
        </Button>
      </div>
    </div>
  )
}

export default PostFilter
