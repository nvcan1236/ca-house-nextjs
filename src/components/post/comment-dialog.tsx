import { MouseEventHandler, ReactNode, useState } from "react"
import { useGetComments, usePostComment } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"
import { SendHorizonalIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"

const CommentDialog = ({
  postId,
  children,
}: {
  postId: string
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const { data: commentsData } = useGetComments(postId, open)
  const commentList = commentsData?.result
  const { mutate: postComment } = usePostComment()
  const [content, setContent] = useState("")
  const { user, openModal } = useAuthStore()

  const comment: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    if (!user || !user.id) {
      setOpen(false)
      openModal()
      setContent("")
      return
    }

    postComment({
      postId,
      comment: {
        content,
      },
    })

    setContent("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex gap-2 items-center pl-3">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Bình luận</DialogTitle>
        </DialogHeader>
        <div className="flex gap-3 border-b pb-4 border-main-blue-s3">
          <Input
            placeholder="Bình luận của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Input>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={content.trim() == ""}
            onClick={comment}
          >
            <SendHorizonalIcon></SendHorizonalIcon>
          </Button>
        </div>
        <ScrollArea className="max-h-[400px] min-h-[200px]">
          <div className="flex flex-col gap-4 pr-3">
            {commentList?.length == 0 && (
              <p className="py-10 text-slate-600 text-center">
                (Chưa có bình luận nào.)
              </p>
            )}
            {commentList?.map((comment) => (
              <div className="font-medium text-sm flex gap-2" key={comment.id}>
                <Avatar>
                  <AvatarImage
                    src={comment.owner.avatar}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {comment.owner.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1">
                  <span className="">{`${comment.owner.lastName} ${comment.owner.firstName}`}</span>
                  <span className="text-xs text-slate-600 ml-2">
                    {new Date(comment.create_at).toLocaleString("vi")}
                  </span>
                  <p className="bg-slate-100 mt-2 p-2 rounded-lg text-sm border border-main-blue-t8 w-fit">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog
