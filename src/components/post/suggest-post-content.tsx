import { useEffect, useState } from "react"
import { getToken } from "@/services/localStorageService"
import { useGetSuggestPostContent } from "@/services/postApi"
import { PenToolIcon } from "lucide-react"

import { PostType, SuggestContent } from "@/types/post"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useAuthStore } from "@/stores/auth-store"

const SuggestPostContent = ({
  postType,
  onSubmit,
}: {
  postType: PostType
  onSubmit: (content: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const {openModal} = useAuthStore()
  const [suggestQuery, setSuggestQuery] = useState<SuggestContent>({
    amenity: "",
    area: 0,
    budget: 0,
    location: "",
    post_type: postType,
  })
  const handleInputChange = (type: string, value: string) => {
    setSuggestQuery((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  useEffect(() => {
    handleInputChange("post_type", postType)
  }, [postType])
  const { mutateAsync: getSuggestContent, isPending } =
    useGetSuggestPostContent()
  const handleClickCreate = async () => {
    const token = getToken()
    if (!token) {
      openModal()
      return
    }
    await getSuggestContent(suggestQuery).then((data) => {
      onSubmit(data?.result || "")
      setOpen(false)
    })
  }

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="absolute bg-background bottom-1 right-1 text-xs text-main-yellow"
        >
          <PenToolIcon size={16} className="mr-1"></PenToolIcon>
          Tạo với AI
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="left">
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="area">Diện tích</Label>
            <Input
              id="area"
              type="number"
              className="col-span-2 h-8"
              value={suggestQuery?.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="budget">Giá thuê</Label>
            <Input
              id="budget"
              type="number"
              className="col-span-2 h-8"
              value={suggestQuery?.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="location">Vị trí</Label>
            <Input
              id="location"
              className="col-span-2 h-8"
              value={suggestQuery?.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="amenity">Tiện ích</Label>
            <Input
              id="amenity"
              className="col-span-2 h-8"
              value={suggestQuery?.amenity}
              onChange={(e) => handleInputChange("amenity", e.target.value)}
            />
          </div>
          <Button
            size={"sm"}
            onClick={handleClickCreate}
            className={cn({ "animate-pulse": isPending })}
          >
            {isPending ? "Đang tạo bằng AI..." : "Tạo"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SuggestPostContent
