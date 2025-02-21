"use client"

import { useState } from "react"
import Image from "next/image"
import { useUploadImages } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { UploadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DecorativeHeading from "@/components/common/decorative-heading"

const UploadMotelImage = () => {
  const { id, prevStep, nextStep } = useCreateMotelStore()
  const { mutateAsync: uploadImage } = useUploadImages()
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
          <DecorativeHeading className="!text-2xl text-main-blue-s3">
            Thêm hình ảnh cho căn trọ
          </DecorativeHeading>

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
            </div>
          </label>
          <Input
            id="motel-image-input"
            type="file"
            className="invisible size-0"
            onChange={(e) => setFiles(e.target.files)}
            multiple
          ></Input>
        </div>

        <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
          <Button variant={"outline"} type="button" asChild>
            <label htmlFor="motel-image-input" className="block">
              <UploadIcon></UploadIcon> Chọn ảnh
            </label>
          </Button>
          <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
            Quay lại
          </Button>
          <Button size={"lg"} onClick={handleUploadImage}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UploadMotelImage
