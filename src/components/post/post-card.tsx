"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useReact } from "@/services/postApi"
import { useFollow } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"
import { HouseIcon, MessageSquareTextIcon, UserPlusIcon } from "lucide-react"
import { toast } from "sonner"

import { IPost } from "@/types/post"
import { postType, reactions } from "@/lib/predefined-data"
import { formatDate } from "@/lib/utils"

import H3 from "../common/h3"
import ImageSlider from "../common/image-slider"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import CommentDialog from "./comment-dialog"
import { useRouter } from "next/navigation"

const PostCard = ({ data }: { data: IPost }) => {
  const [currentReact, setCurrentReact] = useState<
    keyof typeof reactions | null
  >(data.liked)
  const { mutate: reactPost } = useReact()
  const [liked, setLiked] = useState(!!data.liked)
  const { mutate: follow } = useFollow()
  const [post, setPost] = useState(data)
  const { user } = useAuthStore()
  const router = useRouter()

  const react = (postId: string, type: keyof typeof reactions | null) => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước.")
      return
    }
    reactPost({ postId, type })
    setLiked(!liked)
    setPost((prev) => {
      return {
        ...prev,
        react_count: liked ? prev.react_count - 1 : prev.react_count + 1,
      }
    })
    setCurrentReact(type)
  }

  const followUser = (userId: string) => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước.")
      return
    }
    follow(userId)
  }

  useEffect(() => {
    setPost(data)
  }, [data])

  return (
    <div className="bg-background border rounded-xl p-6 pb-4">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-2 items-center flex-1">
            <Avatar>
              <AvatarImage src={post.owner.avatar} />
              <AvatarFallback>
                {post.owner.firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <H3 className="!text-base cursor-pointer overflow-hidden text-ellipsis flex-1">
              <span
                onClick={() => router.push(`/profile/${post.owner.id}`)}
              >{`${post.owner.lastName} ${post.owner.firstName}`}</span>
              <Button
                size={"sm"}
                variant={"secondary"}
                className="text-xs h-auto px-2 py-1 ml-2 inline-flex items-center gap-1"
                onClick={() => followUser(post.create_by)}
              >
                <UserPlusIcon size={16} />
                <span className="hidden sm:inline">Theo dõi</span>
              </Button>
            </H3>
          </div>

          <div className="justify-self-end text-end">
            <p className="text-slate-600 text-sm ">
              Đăng vào {formatDate(post.create_at)}
            </p>
            <span className="font-semibold inline-block mt-px">
              {postType[post.type]}
            </span>
          </div>
        </div>
        <div>
          <p className="">{post.content}</p>
          {post.images.length > 0 && (
            <div className="mt-2 h-[300px]">
              <ImageSlider height={300} images={post.images}></ImageSlider>
            </div>
          )}
        </div>
        <div className="pt-3 border-t flex flex-1 text-sm text-gray-500">
          <div className="flex gap-2 items-center flex-1">
            <HoverCard>
              <HoverCardTrigger
                className="pl-3 flex gap-2"
                onClick={() => react(post.id, currentReact ? null : "LIKE")}
              >
                {currentReact ? (
                  <span className="text-main-yellow">
                    {reactions[currentReact].icon}
                  </span>
                ) : (
                  <span className="text-slate-600">{reactions.LIKE.icon}</span>
                )}
              </HoverCardTrigger>
              {post.react_count} cảm xúc
              <HoverCardContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-fit p-2"
              >
                {Object.keys(reactions).map((type) => (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    key={type}
                    onClick={() =>
                      react(post.id, type as keyof typeof reactions)
                    }
                  >
                    {reactions[type as keyof typeof reactions].icon}
                  </Button>
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center flex-1">
            <CommentDialog postId={post.id}>
              <MessageSquareTextIcon></MessageSquareTextIcon>
              {post.comment_count} Bình luận
            </CommentDialog>
          </div>
          {!!post.motel_id && (
            <Button variant={"secondary"} size={"sm"} className="">
              <Link
                href={`/motels/${post.motel_id}`}
                className="flex justify-center gap-3"
              >
                <span className="hidden sm:inline">Xem phòng</span>
                <HouseIcon size={20}></HouseIcon>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard
