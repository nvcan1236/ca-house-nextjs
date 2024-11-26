import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/utils/helper";
import Pagination from "./Pagination";
import { useState } from "react";
import { useCreateReviewMutation, useGetReviewQuery } from "@/stores/api/motelUtilApi";

const MotelReview = ({ motelId }: { motelId: string }) => {
  const { data: reviewData } = useGetReviewQuery(motelId || "");
  const reviews = reviewData?.result;
  const [createReview] = useCreateReviewMutation();
  const [reviewInput, setReviewInput] = useState("");
  return (
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
            size={'sm'}
            disabled={!reviewInput}
            onClick={() =>
              createReview({
                data: {
                  content: reviewInput,
                },
                motelId,
              })
            }
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
  );
};

export default MotelReview;
