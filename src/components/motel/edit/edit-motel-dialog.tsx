import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  useApproveMotel,
  useGetAiReview,
  useGetMotel,
} from "@/services/motelApi"
import { useAuthStore } from "@/stores/auth-store"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { EditIcon } from "lucide-react"

import { IMotel, IMotelDetail } from "@/types/motel"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import H3 from "@/components/common/h3"
import CustomTooltip from "@/components/common/tooltip"

import { Button } from "../../ui/button"
import DeleteMotelDialog from "../delete-motel-dialog"
import Amenity from "./amenity"
import General from "./general"
import EditLocation from "./location"
import Prices from "./prices"
import Requirement from "./requirement"
import { Skeleton } from "@/components/ui/skeleton"

type TabData = {
  value: string
  label: string
  tabContent: ReactNode
}

const EditMotelDialog: React.FC<{
  children: ReactNode
  motel: IMotel
  forPage?: "user" | "admin"
}> = ({ children, motel, forPage = "user" }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setId, setCurrentStep, setDetailMotel } = useCreateMotelStore()
  const { user } = useAuthStore()
  const { data } = useGetMotel(motel.id, true)
  const [editedMotel, setEditedMotel] = useState<Partial<IMotelDetail>>()
  const { mutate: approveMotel } = useApproveMotel()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name && value) setEditedMotel((prev) => ({ ...prev, [name]: value }))
  }
  const tabs: TabData[] = [
    {
      value: "general",
      label: "Chung",
      tabContent: (
        <General
          editedMotel={editedMotel}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      value: "location",
      label: "Địa chỉ",
      tabContent: (
        <EditLocation
          editedMotel={editedMotel}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      value: "amenity",
      label: "Tiện nghi",
      tabContent: (
        <Amenity
          editedMotel={editedMotel}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      value: "prices",
      label: "Giả cả",
      tabContent: (
        <Prices
          editedMotel={editedMotel}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      value: "requirements",
      label: "Yêu cầu",
      tabContent: (
        <Requirement
          editedMotel={editedMotel}
          handleInputChange={handleInputChange}
        />
      ),
    },
  ]

  const [tabValue, setTabValue] = useState(tabs[0].value)

  useEffect(() => {
    setEditedMotel(data?.result)
  }, [data])

  const { data: aiReview, isLoading: isLoadingAiReview } = useGetAiReview(
    editedMotel?.id || ""
  )

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Chi tiết nhà trọ</DialogTitle>
        </DialogHeader>

        <Tabs value={tabValue} className="w-full">
          <TabsList className="w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setTabValue(tab.value)}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[400px] pr-4 ">
            {tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value}>
                {tab.tabContent}
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end mt-3 gap-4">
          {editedMotel?.ownerId === user?.username && (
            <>
              {editedMotel?.id && (
                <DeleteMotelDialog
                  motelId={editedMotel?.id}
                  onDelete={() => {
                    setOpen(false)
                  }}
                />
              )}
              <Button
                onClick={() => {
                  if (editedMotel && editedMotel.id) {
                    setId(editedMotel.id)
                    setDetailMotel(editedMotel)
                  }

                  setCurrentStep(1)
                  router.push("/motels/register")
                }}
              >
                <EditIcon size={16} className="mr-2" /> Chỉnh sửa
              </Button>
            </>
          )}
          {forPage === "admin" && editedMotel?.id && (
            <div className="w-full ">
              <div>
                <H3 className="!text-base text-left mb-1">AI Review: </H3>
                {isLoadingAiReview ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <CustomTooltip label={aiReview?.result.reason || ""}>
                    <p
                    className={cn(
                      "text-xs text-left line-clamp-3 overflow-ellipsis",
                      {
                        "text-green-600": aiReview?.result.status == "APPROVED",
                        "text-destructive":
                          aiReview?.result.status == "REJECTED",
                        "text-yellow-500":
                          aiReview?.result.status == "PENDING",
                      }
                    )}
                  >
                    {aiReview?.result.reason}
                  </p>
                  </CustomTooltip>
                )}
              </div>
              <div className="text-right">
                <Button
                  onClick={() => {
                    approveMotel(editedMotel?.id || "")
                    setOpen(false)
                  }}
                  variant={"unset"}
                  size={"sm"}
                  className={cn("hover:opacity-70 text-white", {
                    "bg-green-600 ": editedMotel?.status == "NOT_APPROVED",
                    "bg-destructive": editedMotel?.status == "AVAILABLE",
                  })}
                >
                  {`${
                    editedMotel && editedMotel.status == "AVAILABLE"
                      ? "Huỷ duyệt"
                      : "Duyệt trọ"
                  }`}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditMotelDialog
