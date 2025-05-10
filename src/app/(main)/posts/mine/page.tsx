"use client"

import { useGetPostsByUser } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"
import { EditIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DecorativeHeading from "@/components/common/decorative-heading"
import EditPostDialog from "@/components/post/edit/edit-post-dialog"
import PostCard from "@/components/post/post-card"
import PostCreate from "@/components/post/post-create"
import DeletePostDialog from "@/components/post/delete-post-dialog"

const MyPosts = () => {
  const { user } = useAuthStore()
  const { data } = useGetPostsByUser(0, user?.username || "")
  const posts = data?.result
  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center">
        <DecorativeHeading>Bài viết của bạn</DecorativeHeading>
        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <PlusIcon size={20} className="mr-2" /> Đăng bài viết
            </Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Đăng bài viết</DialogTitle>
            </DialogHeader>
            <PostCreate />
          </DialogContent>
        </Dialog>
      </div>
      {posts?.length == 0 && (
        <p className="text-muted-foreground text-center py-20">
          ( Chưa đăng bài viết nào )
        </p>
      )}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-6">
        {posts?.map((post) => (
          <div key={post.id} className="break-inside-avoid">
            <div className="inline-flex gap-1 p-1">
              <EditPostDialog post={post}>
                <Button size={"sm"} variant={"outline"}>
                  <EditIcon size={16} className="mr-2" /> Chỉnh sửa
                </Button>
              </EditPostDialog>
              <DeletePostDialog postId={post.id}/>
            </div>
            <PostCard data={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPosts
