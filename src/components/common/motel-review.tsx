import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Pagination from "./pagination";
import { useState } from "react";
import {
  useCreateReviewMutation,
  useGetReviewQuery,
} from "@/stores/api/motelUtilApi";
import { formatDate } from "@/lib/utils";

const MotelReview = ({ motelId }: { motelId: string }) => {
  const { data: reviewData } = useGetReviewQuery(motelId || "");
  const reviews = reviewData?.result;
  const [createReview] = useCreateReviewMutation();
  const [reviewInput, setReviewInput] = useState("");
  return (
   
  );
};

export default MotelReview;
