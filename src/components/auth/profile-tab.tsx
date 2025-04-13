import React from "react"
import { useGetMotelByUser } from "@/services/motelApi"
import { useGetPostsByUser } from "@/services/postApi"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import MotelCard from "../motel/motel-card"
import PostCard from "../post/post-card"

const ProfileTab = ({ userId }: { userId: string }) => {
  const { data: motels } = useGetMotelByUser(userId)
  const { data: posts } = useGetPostsByUser(0, userId)
  return (
    <Tabs defaultValue="motel">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="motel"
          className="data-[state=active]:bg-main-blue-t8"
        >
          Trọ
        </TabsTrigger>
        <TabsTrigger
          value="post"
          className="data-[state=active]:bg-main-blue-t8"
        >
          Bài đăng
        </TabsTrigger>
      </TabsList>
      <TabsContent value="motel">
        <Card className="min-h-[600px]">
          <CardHeader>
            <CardTitle>Trọ</CardTitle>
            <CardDescription>Danh sách các phòng trọ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {motels?.result.map((motel) => (
                <MotelCard key={motel.id} motel={motel} />
              ))}
            </div>
            {motels?.result.length === 0 && (
              <div className="text-center items-center h-full">
                <p className="text-gray-500">Không có trọ</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="post">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Bài đăng</CardTitle>
            <CardDescription>Danh sách các bài đăng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 gap-4">
              {posts?.result?.map((post) => (
                <PostCard key={post.id} data={post} />
              ))}
              {!posts?.result ||
                (posts?.result.length === 0 && (
                  <div className="text-center items-center h-full">
                    <p className="text-gray-500">Không có bài đăng</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default ProfileTab
