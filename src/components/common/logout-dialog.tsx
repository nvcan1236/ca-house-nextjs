import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { resetToken } from "@/services/axios"
import { useLogoutMutation } from "@/services/userApi"

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

export function LogoutDialog({ children }: { children: ReactNode }) {
  const { mutate: logout } = useLogoutMutation()
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thông báo</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn đăng xuất?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-none p-0" asChild>
            <Button
              variant={"destructive"}
              className="px-4"
              onClick={() => {
                router.push("/")
                logout()
                resetToken()
              }}
            >
              Đăng xuất
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
