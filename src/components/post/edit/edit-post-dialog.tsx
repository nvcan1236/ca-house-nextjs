"use client"

import { ReactNode, useState } from "react"
import { useGetPost, useUpdatePost } from "@/services/postApi"

import { IPost } from "@/types/post"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import MotelSelect from "@/components/common/motel-select"

const EditPostDialog: React.FC<{ children: ReactNode; post: IPost }> = ({
  children,
  post,
}) => {
  const [open, setOpen] = useState(false)
  const { data } = useGetPost(post.id)
  const editPost = data?.result
  const [content, setContent] = useState(editPost?.content)
  const { mutate: updatePost } = useUpdatePost()

  const handleSave = () => {
    if (editPost)
      updatePost(
        { postId: editPost.id, content: content || "" },
        {
          onSuccess: () => {
            setOpen(false)
          },
        }
      )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right mt-2">
              Nội dung
            </Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={editPost?.content}
              value={content}
              rows={7}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 h-fit"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_by" className="text-right">
              Người tạo
            </Label>
            <Input
              id="create_by"
              name="create_by"
              value={editPost?.create_by}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_at" className="text-right">
              Ngày tạo
            </Label>
            <Input
              id="create_at"
              name="create_at"
              value={formatDateTime(editPost?.create_at || "")}
              disabled
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Loài bài đăng
            </Label>
            <Select name="type" value={editPost?.type}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Loài bài đăng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"REVIEW"} value={"REVIEW"}>
                  Đánh giá
                </SelectItem>
                <SelectItem key={"PASS_ROOM"} value={"PASS_ROOM"}>
                  Nhượng phòng
                </SelectItem>
                <SelectItem key={"FIND_ROOM"} value={"FIND_ROOM"}>
                  Tìm phòng trọ
                </SelectItem>
                <SelectItem key={"FIND_ROOMMATE"} value={"FIND_ROOMMATE"}>
                  Tìm người ở chung
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motel_id" className="text-right">
              Nhà trọ
            </Label>
            <MotelSelect value={editPost?.motel_id} />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button onClick={handleSave}>Cập nhật bài viết</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
