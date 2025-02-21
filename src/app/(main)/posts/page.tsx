"use client"
import PostCreate from "@/components/post/post-create"
import PostFilter from "@/components/post/post-filter"
import PostList from "@/components/post/post-list"

const PostListPage = () => {
  return (
    <div className="flex mt-3 items-start justify-center gap-3">
      <div className="lg:w-1/4 lg-w-1/4 sticky top-[140px]   hidden md:block">
        <PostFilter />
      </div>

      <div className="flex-1">
        <PostList />
      </div>

      <div className="lg:w-1/4 sticky top-[140px]  hidden lg:block">
        <PostCreate />
      </div>
    </div>
  )
}

export default PostListPage