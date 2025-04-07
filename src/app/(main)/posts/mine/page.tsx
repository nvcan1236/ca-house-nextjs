"use client"

import { useRouter } from "next/navigation"
import { useGetPostsByUser } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import H3 from "@/components/common/h3"
import EditPostDialog from "@/components/post/edit/edit-post-dialog"
import PostCard from "@/components/post/post-card"

const MyPosts = () => {
  const { user } = useAuthStore()
  const { data } = useGetPostsByUser(0, user?.username || "")
  const posts = data?.result
  const router = useRouter()
  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center">
        <H3>Danh sách bài viết</H3>
        <Button variant={"outline"} onClick={() => router.push("/posts")}>
          <PlusIcon size={20} className="mr-2" /> Đăng bài viết
        </Button>
      </div>
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
