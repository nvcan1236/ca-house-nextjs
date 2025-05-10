import React, { useEffect, useState } from "react"
import { useGetPosts } from "@/services/postApi"
import { usePostFilterStore } from "@/stores/post-filter-store"
import dayjs from "dayjs"

import { IPost } from "@/types/post"

import PostCard from "./post-card"
import PostSketeton from "./post-skeleton"

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetPosts()

  const posts = data?.pages.flatMap((page) => page.result) || []
  const {
    filter: filterPost,
    date,
    keyword,
    sort,
    applied,
  } = usePostFilterStore()

  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])

  useEffect(() => {
    setFilteredPosts(posts)
  }, [isFetching])

  useEffect(() => {
    if (applied > 0) {
      const filteredPosts = posts.filter((p) => filterPost.includes(p.type))
      if (sort === "newest") {
        filteredPosts.sort((a, b) =>
          dayjs(b.create_at).diff(dayjs(a.create_at))
        )
      } else {
        filteredPosts.sort((a, b) =>
          dayjs(a.create_at).diff(dayjs(b.create_at))
        )
      }

      if (date) {
        filteredPosts.filter((p) =>
          dayjs(p.create_at).isSame(dayjs(date), "day")
        )
      }
      setFilteredPosts(filteredPosts)
    }
    else {
      setFilteredPosts(posts)
    }
  }, [applied])

  useEffect(() => {
    const filteredPosts = posts.filter((p) =>
      p.content.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredPosts(filteredPosts)
    if (!!keyword) {
      setFilteredPosts(filteredPosts)
    } else {
      setFilteredPosts(posts)
    }
  }, [keyword])

  

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
      {filteredPosts.length === 0 && (
        <div className="text-center text-gray-500">Không có bài viết nào</div>
      )}
      {filteredPosts?.map((post) => <PostCard key={post.id} data={post} />)}
    </div>
  )
}

export default PostList
