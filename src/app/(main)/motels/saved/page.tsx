"use client"

import { useGetSavedMotel, useSaveMotel } from "@/services/motelApi"
import { BookmarkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProtectedRoute from "@/components/auth/protected-route"
import H3 from "@/components/common/h3"
import Container from "@/components/layout/container"
import MotelCard from "@/components/motel/motel-card"

const SavedMotelPage = () => {
  const { data } = useGetSavedMotel()
  const { mutateAsync: saveMotel } = useSaveMotel()
  const motels = data?.result
  return (
    <ProtectedRoute>
      <Container className="min-h-[500px]">
        <H3>Danh sách phòng đã lưu</H3>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 mt-6 gap-4">
          {motels?.map((motel) => (
            <div key={motel.id} className="relative">
              <MotelCard motel={motel} />
              <Button
                variant={"outline"}
                onClick={() => saveMotel(motel.id)}
                className="border-main-yellow absolute top-2 right-2"
              >
                <BookmarkIcon className="fill-main-yellow text-main-yellow " />
              </Button>
            </div>
          ))}
          {motels?.length == 0 && (
            <p className="py-6 ml-10 text-slate-600 ">
              (Bạn chưa tạo phòng trọ nào)
            </p>
          )}
        </div>
      </Container>
    </ProtectedRoute>
  )
}

export default SavedMotelPage
