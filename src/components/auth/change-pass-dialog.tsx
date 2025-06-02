import { useState } from "react"
import { useChangePassword } from "@/services/userApi"
import { Eye, EyeOff, Lock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ChangePassDialog = () => {
  const [open, setOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { mutate: changePassword } = useChangePassword()
  const handleChangePassword = () => {
    changePassword(
      {
        oldPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Đổi mật khẩu thành công")
          setOpen(false)
        },
        onError: (error) => {
          toast.error(error.response?.data.message)
        },
      }
    )
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="mt-4">
          <Lock size={16} className="mr-2" />
          Đổi mật khẩu
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Mật khẩu cũ</Label>
            <div className="flex gap-2 items-center">
              <Input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Button
                variant={"ghost"}
                size={"sm"}
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Mật khẩu mới</Label>
            <div className="flex gap-2 items-center">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                variant={"ghost"}
                size={"sm"}
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePassDialog
