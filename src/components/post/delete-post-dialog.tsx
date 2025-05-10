import React, { FC } from "react"
import { useDeletePost } from "@/services/postApi"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

const DeletePostDialog: FC<{ postId: string }> = ({ postId }) => {
  const { mutate: deletePost } = useDeletePost()
  const handleDeletePost = () => {
    deletePost(postId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"} size={"sm"}>
          <Trash2Icon className="mr-2" size={16} /> Xoá 
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Xoá trọ</AlertDialogHeader>
        <AlertDialogDescription>
          Thông tin bài đăng của bạn sẽ bị xoá vĩnh viễn. Bạn có chắc muốn xoá
          bài đăng.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePost}>Xoá</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog
