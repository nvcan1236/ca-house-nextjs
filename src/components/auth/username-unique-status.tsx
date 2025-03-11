import React, { useEffect, useState } from "react"
import { useCheckUsername } from "@/services/userApi"
import { CheckIcon, RotateCwIcon, XIcon } from "lucide-react"

import { useDebouce } from "@/hooks/use-debounce"

const UsernameStatus = ({ username }: { username: string }) => {
  const [isUsernameUnique, setIsUsernameUnique] = useState(false)
  const [isChecking, setIsChecking] = useState<boolean>()
  const { mutateAsync: checkUsername } = useCheckUsername()

  useEffect(() => {
    setIsChecking(true)
  }, [username])

  useDebouce(
    () => {
      if (!username.trim()) return
      checkUsername(username).then(({ result }) => {
        setIsUsernameUnique(!result)
        setIsChecking(false)
      })
    },
    [username],
    2000
  )

  if (!username) return

  return (
    <div className="text-sm font-medium mt-1 flex gap-2 items-center">
      {isChecking && (
        <>
          <RotateCwIcon size={16} className="animate-spin text-main-yellow" />
          <span className="text-main-yellow animate-pulse ">
            Đang kiểm tra...
          </span>
        </>
      )}

      {!isChecking &&
        (isUsernameUnique ? (
          <>
            <CheckIcon size={16} className="text-green-700" />
            <span className="text-green-700">
              {username} có thể sử dụng để đăng ký
            </span>
          </>
        ) : (
          <>
            <XIcon size={16} className="text-red-700" />
            <span className="text-red-700">{username} đã được sử dụng</span>
          </>
        ))}
    </div>
  )
}

export default UsernameStatus
