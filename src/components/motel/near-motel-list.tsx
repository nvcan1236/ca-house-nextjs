"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAddressFromCoord } from "@/services/map-service"
import { useGetNearestMotels } from "@/services/motelApi"
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from "lucide-react"

import DecorativeHeading from "../common/decorative-heading"
import H3 from "../common/h3"
import { Button } from "../ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel"
import MotelCard from "./motel-card"
import MotelSkeleton from "./motel-skeleton"

const NearMotelList = () => {
  const router = useRouter()
  const [api, setApi] = React.useState<CarouselApi>()
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  })
  const [place, setPlace] = useState("")
  const { data: nearMotels, isLoading: isLoadingNear } = useGetNearestMotels({
    lat: currentLocation.latitude,
    lon: currentLocation.longitude,
    radius: 5000,
  })

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        const data = await getAddressFromCoord(
          position.coords.longitude,
          position.coords.latitude
        )
        setPlace(data.data.features[0].place_name)
      },
      (error) => {
        console.error("Error getting location:", error)
      }
    )
  }, [])

  if (!currentLocation.latitude || !currentLocation.longitude) return null

  return (
    <div className="">
      <div className="flex justify-between items-baseline">
        <DecorativeHeading>Đề xuất trọ gần bạn</DecorativeHeading>
        <div className="px-4 py-1 bg-background border border-main-blue rounded-full flex items-center gap-2">
          <MapPinIcon size={16} className="text-main-yellow" />
          <p className="text-sm max-w-[240px] line-clamp-1 overflow-ellipsis">
            {place}
          </p>
        </div>
      </div>
      {isLoadingNear ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <MotelSkeleton key={index} />
            ))}
        </div>
      ) : nearMotels?.result.length === 0 ? (
        <H3 className="text-center mt-4 text-sm text-muted-foreground">
          Không tìm thấy trọ gần bạn
        </H3>
      ) : (
        <Carousel
          className="mt-4"
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {nearMotels?.result.slice(0, 4).map((motel) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/4 pl-4"
                key={motel.id}
              >
                <MotelCard
                  motel={motel}
                  onClick={() => router.push(`/motels/${motel.id}`)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center md:justify-end mt-2 gap-4">
            <Button
              size={"sm"}
              variant={"outline"}
              className="px-4"
              disabled={!api?.canScrollPrev() || false}
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="px-4"
              disabled={!api?.canScrollNext() || false}
              onClick={() => api?.scrollNext()}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </Carousel>
      )}
    </div>
  )
}

export default NearMotelList
