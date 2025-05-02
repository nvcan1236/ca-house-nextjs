"use client"

import { useState } from "react"
import Image from "next/image"
import { useUploadImages } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { LoaderCircleIcon, UploadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DecorativeHeading from "@/components/common/decorative-heading"

import CreateProgress from "./create-progress"

const UploadMotelImage = () => {
  const { id, nextStep, detailMotel } = useCreateMotelStore()
  const { mutateAsync: uploadImage, isPending: loadingUpload } =
    useUploadImages()
  const [files, setFiles] = useState<FileList | null>()
  const handleUploadImage = async () => {
    if (!files || files.length < 5) {
      toast.error("Vui lòng chọn ít nhất 5 ảnh")
      return
    }

    if (id) {
      const { code } = await uploadImage({ motelId: id, images: files })
      if (code == 1000) nextStep()
      else toast.error("Đã có lỗi xảy ra!!")
    }
  }

  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="lg:w-[800px] w-full mx-auto ">
          <div className="flex justify-between items-center">
            <DecorativeHeading className="!text-2xl text-main-blue-s3">
              Thêm hình ảnh cho căn trọ{" "}
            </DecorativeHeading>
            <Button variant={"secondary"} type="button" asChild>
              <label htmlFor="motel-image-input">
                {loadingUpload ? (
                  <LoaderCircleIcon className="animate-spin mr-2" />
                ) : (
                  <UploadIcon size={20} className="mr-2" />
                )}
                Chọn tối thiểu 5 ảnh
              </label>
            </Button>
          </div>

          <label
            htmlFor="motel-image-input"
            className=" block mt-10 min-h-[400px]  border-2 border-main-blue-s3 p-2 rounded-lg border-dashed"
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
              {files &&
                Array.from(files).map((file) => (
                  <div key={file.name} className="">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="selected motel images"
                      width={300}
                      height={200}
                    />
                  </div>
                ))}

              {!files &&
                detailMotel?.images &&
                detailMotel?.images?.length > 0 &&
                detailMotel?.images.map((image) => (
                  <div key={image.id} className="">
                    <Image
                      src={image.url}
                      alt="selected motel images"
                      width={300}
                      height={200}
                    />
                  </div>
                ))}
            </div>
          </label>
          <Input
            id="motel-image-input"
            type="file"
            className="invisible size-0"
            onChange={(e) => setFiles(e.target.files)}
            accept="image/*"
            multiple
          ></Input>
        </div>

        <CreateProgress
          disableNext={!files || files?.length < 5 || loadingUpload}
          onNextClick={handleUploadImage}
          nextText={files && files?.length >= 5 ? "Upload ảnh" : ""}
        />
      </div>
    </div>
  )
}

export default UploadMotelImage
