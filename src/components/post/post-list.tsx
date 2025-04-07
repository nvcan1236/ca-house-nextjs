import React, { useEffect, useState } from "react"
import { useGetPosts } from "@/services/postApi"
import { usePostFilterStore } from "@/stores/post-filter-store"

import { IPost } from "@/types/post"

import PostCard from "./post-card"
import PostSketeton from "./post-skeleton"

const PostList = () => {
  const [offset, setOffset] = useState(0)
  const [postList, setPostList] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState(false)
  const { data: postData, isFetching } = useGetPosts(offset)

  const { filter: filterPost } = usePostFilterStore()

  useEffect(() => {
    if (postData) {
      setPostList((prevPosts) => [...prevPosts, ...postData.result])
      setHasMore(postData.result.length == 10)
    }
  }, [isFetching])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50 &&
        !isFetching &&
        hasMore
      ) {
        setOffset((prevPage) => prevPage + 10)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isFetching, hasMore])

  if (!postData?.result && isFetching)
    return (
      <div className="flex gap-4 flex-col">
        <PostSketeton />
        <PostSketeton />
      </div>
    )

  return (
    <div className="flex flex-col gap-4">
      {postList
        ?.filter((p) => filterPost.includes(p.type))
        ?.map((post) => <PostCard key={post.id} data={post} />)}
    </div>
  )
}

export default PostList
