import { useRouter } from "next/navigation"

import { IMotel } from "@/types/motel"

import H3 from "../common/h3"
import ImageSlider from "../common/image-slider"
import MotelTypeBadge from "./motel-type.badge"

const MotelCard = ({
  motel,
  onClick,
}: {
  motel: IMotel
  onClick?: () => void
}) => {
  const router = useRouter()
  return (
    <div className="overflow-hidden border rounded-lg shadow-sm bg-background cursor-pointer">
      <ImageSlider
        images={motel.images}
        height={160}
        onClick={() => {
          if (onClick) onClick()
        }}
      ></ImageSlider>
      <div className="p-3 text-sm">
        <div className="flex gap-2 items-center mb-1">
          <H3
            className="text-left font-medium flex-1 overflow-ellipsis line-clamp-1 text-base"
            onClick={() => router.push(`/motels/${motel.id}`)}
          >
            {motel?.name}
          </H3>
          <MotelTypeBadge type={motel.type} size="sm"></MotelTypeBadge>
        </div>
        <p className="!text-sm line-clamp-1">
          {motel.district}, {motel.city}
        </p>
        <div className="flex gap-2 items-center justify-between mt-3">
          <span>
            Diện tích: {motel?.area}m<sup>2</sup>
          </span>
          <span className="font-semibold text-main-blue text-lg">
            {Number(motel?.price).toLocaleString()}/
            <span className="text-xs">tháng</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MotelCard
