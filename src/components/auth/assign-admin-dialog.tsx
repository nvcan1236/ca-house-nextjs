import React from "react"
import { useAssignAdminRole } from "@/services/userApi"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { toast } from "sonner"

const AssignAdminDialog = ({ userId }: { userId: string }) => {
  const { mutate: assignAdminRole } = useAssignAdminRole()
  const handleAssignAdmin = async () => {
    try {
      // Call the API to assign admin role
      await assignAdminRole(userId)
      toast.success("Đã gán quyền Admin thành công!")
    } catch (error) {
      console.error("Failed to assign admin role:", error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} onClick={(e) => e.stopPropagation()}>
          Gán quyền Admin
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Điều này sẽ vĩnh viễn xóa tài
            khoản của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleAssignAdmin}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AssignAdminDialog
