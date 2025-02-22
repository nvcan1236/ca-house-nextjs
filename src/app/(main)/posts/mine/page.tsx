"use client"

import { useGetPostsByUser } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"

import H3 from "@/components/common/h3"
import EditPostDialog from "@/components/post/edit-post-dialog"
import PostCard from "@/components/post/post-card"

const MyPosts = () => {
  const { user } = useAuthStore()
  const { data } = useGetPostsByUser(0, user?.username || "")
  const posts = data?.result
  return (
    <div className="mx-auto">
      <H3>Danh sách bài viết</H3>
      {posts?.length == 0 && (
        <p className="text-muted-foreground text-center py-20">
          ( Chưa đăng bài viết nào )
        </p>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6 min-h-screen place-content-start">
        {posts?.map((post) => (
          <EditPostDialog post={post} key={post.id}>
            <div>
              <PostCard data={post} />
            </div>
          </EditPostDialog>
        ))}
      </div>
    </div>
  )
}

export default MyPosts
