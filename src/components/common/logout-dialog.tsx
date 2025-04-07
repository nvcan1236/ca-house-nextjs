import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"

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
  const { setUserInfor } = useAuthStore()
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
          <AlertDialogAction className="bg-none p-0">
            <Button
              variant={"destructive"}
              onClick={() => {
                logout()
                setUserInfor(undefined)
                router.push("/")
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
