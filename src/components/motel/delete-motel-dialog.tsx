import React, { FC } from "react"
import { useDeleteMotel } from "@/services/motelApi"
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

const DeleteMotelDialog: FC<{ motelId: string; onDelete?: () => void }> = ({
  motelId,
  onDelete,
}) => {
  const { mutate: deleteMotel } = useDeleteMotel()
  const handleDeleteMotel = () => {
    deleteMotel(motelId, {
      onSuccess: onDelete,
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>
          <Trash2Icon className="mr-2" size={16} /> Xoá trọ
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Xoá trọ</AlertDialogHeader>
        <AlertDialogDescription>
          Thông tin nhà trọ của bạn sẽ bị xoá vĩnh viễn. Bạn có chắc muốn xoá
          nhà trọ.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMotel}>Xoá</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteMotelDialog
