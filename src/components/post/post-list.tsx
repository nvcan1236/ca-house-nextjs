import React, { useEffect } from "react"
import { useGetPosts } from "@/services/postApi"
import { usePostFilterStore } from "@/stores/post-filter-store"

import PostCard from "./post-card"
import PostSketeton from "./post-skeleton"

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetPosts()

  const posts = data?.pages.flatMap((page) => page.result) || []
  const { filter: filterPost } = usePostFilterStore()

  // Xử lý infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const scrollThreshold = document.documentElement.scrollHeight - 400

      if (
        scrollPosition >= scrollThreshold &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isFetching && !isFetchingNextPage)
    return (
      <div className="flex gap-4 flex-col">
        <PostSketeton />
        <PostSketeton />
      </div>
    )

  return (
    <div className="flex flex-col gap-4">
      {posts
        ?.filter((p) => filterPost.includes(p.type))
        ?.map((post) => <PostCard key={post.id} data={post} />)}
    </div>
  )
}

export default PostList
