"use client"

import React, { ChangeEvent, useState } from "react"
import { useCreatePost, useUploadImage } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"
import { useQueryClient } from "@tanstack/react-query"
import { HouseIcon, ImageIcon } from "lucide-react"
import { toast } from "sonner"

import { IPostCreate } from "@/types/post"

import H3 from "../common/h3"
import ImageSlider from "../common/image-slider"
import SelectBox from "../common/select-box"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import SuggestPostContent from "./suggest-post-content"

const postInit: IPostCreate = {
  content: "",
  type: "FIND_ROOM",
}

const PostCreate = () => {
  const [images, setImages] = useState<FileList | null>(null)
  const { mutateAsync: createPost } = useCreatePost()
  const { mutate: uploadImages } = useUploadImage()
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const [postCreateData, setPostCreateData] = useState<IPostCreate>(postInit)
  const handleChangePost = (
    type: keyof IPostCreate,
    value: string | typeof postInit.type
  ) => {
    const nextData: IPostCreate = {
      ...postCreateData,
      [type]: value,
    }
    setPostCreateData(nextData)
  }

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files)
  }

  const handleSubmitPost = () => {
    if (!user) {
      toast.warning("Vui lòng đang nhập trước khi đăng")
      return
    }
    createPost(postCreateData).then((data) => {
      const postId = data.result.id
      if (images && images.length > 0 && postId)
        uploadImages({ postId, images })

      queryClient.invalidateQueries({ queryKey: ["posts"] })
    })

    setPostCreateData(postInit)
    setImages(null)
  }

  return (
    <div className={`rounded-xl border bg-background py-4 px-6 `}>
      <H3>Tạo bài viết</H3>
      <div className="mt-4">
        <div>
          <Label className="text-sm text-slate-600">Bạn muốn đăng bài</Label>
          <SelectBox
            options={[
              { value: "FIND_ROOM", label: "Tìm trọ" },
              { value: "PASS_ROOM", label: "Pass trọ" },
              { value: "REVIEW", label: "Review" },
              { value: "FIND_ROOMMATE", label: "Tìm người ở ghép" },
            ]}
            onSelectChange={(value) => handleChangePost("type", value)}
          ></SelectBox>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Nội dung bài viết..."
            rows={10}
            value={postCreateData.content}
            onChange={(e) => handleChangePost("content", e.target.value)}
          ></Textarea>
          <SuggestPostContent
            postType={postCreateData.type}
            onSubmit={(content) => handleChangePost("content", content)}
          />
        </div>
        <Input
          id="post-image-input"
          type="file"
          accept="image/*"
          className="size-0 invisible"
          onChange={handleChangeImage}
          multiple
        ></Input>

        <div className="flex justify-end text-main-blue-s3 mt-3 items-center">
          <Dialog
            open={(open && images && images.length > 0) || false}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <Button size={"icon"} variant={"ghost"} className="relative">
                <Label
                  htmlFor={
                    !images || images.length === 0 ? "post-image-input" : ""
                  }
                >
                  <ImageIcon></ImageIcon>
                </Label>
                {images && images.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-main-yellow text-white text-xs rounded-full">
                    {images.length}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="p-8 max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Ảnh bài viết</DialogTitle>
              </DialogHeader>
              <div>
                {images && (
                  <ImageSlider
                    height={500}
                    images={Array.from(images).map((image: File) => ({
                      id: image.name,
                      url: URL.createObjectURL(image),
                    }))}
                  ></ImageSlider>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={postCreateData.type === "FIND_ROOM"}
          >
            <HouseIcon></HouseIcon>
          </Button>

          <Button
            size={"sm"}
            className="block ml-auto"
            onClick={handleSubmitPost}
            disabled={Object.values(postCreateData).some(
              (value) => !value.trim()
            )}
          >
            Đăng bài
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCreate
