"use client"

import { useMediaQuery } from "@custom-react-hooks/use-media-query"

import PostCreate from "@/components/post/post-create"
import PostFilter from "@/components/post/post-filter"
import PostList from "@/components/post/post-list"

const PostListPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <div className="flex mt-3 items-start justify-center gap-3">
      <div className="lg:w-1/4 lg-w-1/4 sticky top-[100px] hidden md:block">
        <PostFilter />
      </div>

      <div className="flex-1">
        <div className="lg:hidden mb-4">
          {!isDesktop ? <PostCreate /> : null}
        </div>
        <PostList />
      </div>

      <div className="lg:w-1/4 sticky top-[100px] hidden lg:block">
        {isDesktop ? <PostCreate /> : null}
      </div>
    </div>
  )
}

export default PostListPage
