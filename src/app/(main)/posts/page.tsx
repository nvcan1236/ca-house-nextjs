"use client"

import { FilterIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import PostCreate from "@/components/post/post-create"
import PostCreateDialog from "@/components/post/post-create-dialog"
import PostFilter from "@/components/post/post-filter"
import PostList from "@/components/post/post-list"

const PostListPage = () => {
  // const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <div className="flex mt-3 items-start justify-center gap-3">
      <div className="lg:w-1/4 lg-w-1/4 sticky top-[100px] hidden md:block">
        <PostFilter />
      </div>

      <div className="flex-1">
        <div className="lg:hidden mb-4 flex justify-end gap-2">
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant={"secondary"}>
                <FilterIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 bg-transparent border-none">
              <PostFilter />
            </PopoverContent>
          </Popover>

          <PostCreateDialog>
            <Button size={"sm"} variant={"secondary"}>
              <PlusIcon className="mr-2" size={16} />
              Tạo bài viết
            </Button>
          </PostCreateDialog>
        </div>
        <PostList />
      </div>

      <div className="lg:w-1/4 sticky top-[100px] hidden lg:block">
        <PostCreate />
      </div>
    </div>
  )
}

export default PostListPage
