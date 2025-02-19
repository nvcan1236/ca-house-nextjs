"use client"

import { useState } from "react"
import { SendIcon } from "lucide-react"

import { IMotelDetail, Review } from "@/types/motel"
import { formatDate } from "@/lib/utils"
import Pagination from "@/components/common/pagination"

import DecorativeHeading from "../../common/decorative-heading"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

const DetailMotelReview = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const [reviewInput, setReviewInput] = useState("")
  const handleCreateReview = () => {
    // createReview({
    //   data: {
    //     content: reviewInput,
    //   },
    //   motelId: detailMotel.id,
    // })
  }
  const reviews: Review[] = []
  return (
    <div>
      <DecorativeHeading>Đánh giá</DecorativeHeading>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          <div className="col-span-3 flex items-center gap-4">
            <Input
              value={reviewInput}
              className="w-[320px]"
              placeholder="Nêu cảm nhận của bạn..."
              onChange={(e) => setReviewInput(e.target.value)}
            />
            <Button
              variant={"secondary"}
              size={"sm"}
              disabled={!reviewInput}
              onClick={handleCreateReview}
            >
              Gửi <SendIcon className="ml-2" size={20} />
            </Button>
          </div>
          {reviews?.map((review) => (
            <div
              className="border rounded-lg bg-background flex gap-4 px-6 py-4"
              key={review.id}
            >
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-xs flex justify-between items-center">
                  {review.createdBy}{" "}
                  <span className="text-xs  text-slate-600">
                    {formatDate(review.createdAt)}
                  </span>
                </p>
                <p className="text-slate-600 text-sm mt-1">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Pagination current={1} max={4}></Pagination>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelReview
