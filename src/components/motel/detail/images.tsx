import React from "react"
import Image from "next/image"

import { IMotelDetail } from "@/types/motel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ImageSlider from "@/components/common/image-slider"

const DetailMotelImages = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  return (
    <div>
      <div className="lg:hidden">
        <ImageSlider
          images={detailMotel.images || []}
          height={300}
        ></ImageSlider>
      </div>

      <div className="hidden lg:block">
        <Dialog>
          <DialogTrigger asChild>
            <div className="grid-cols-4 gap-4  mx-auto rounded-xl overflow-hidden grid w-full">
              {detailMotel?.images.slice(0, 5).map((image) => (
                <div
                  className="last:opacity-40 first:row-span-2 first:col-span-2 h-[200px] first:h-[416px]"
                  key={image.id}
                >
                  <Image
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                    width={300}
                    height={200}
                    priority
                  />
                </div>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent className="p-8 max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Một vài hình ảnh của trọ</DialogTitle>
            </DialogHeader>
            <ImageSlider height={500} images={detailMotel?.images || []} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default DetailMotelImages
