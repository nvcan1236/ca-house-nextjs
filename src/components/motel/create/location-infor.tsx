"use client"

import { useEffect, useState } from "react"
import { useCreateLocationMotel } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { MapPinIcon } from "lucide-react"
import { Marker } from "react-map-gl"

import { District, Ward } from "@/types/common"
import { Location } from "@/types/motel"
import { getDistricts, getProvinces, getWards } from "@/lib/provinces-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DecorativeHeading from "@/components/common/decorative-heading"
import BaseMap from "@/components/map/base-map"

import CreateProgress from "./create-progress"
import LocationsPopover from "./location-list-popover"

const LocationInfo = () => {
  const provinces = getProvinces()
  const [districtList, setDistrictList] = useState<District[]>([])
  const [wardList, setWardList] = useState<Ward[]>([])
  const { mutate: createLocation } = useCreateLocationMotel()
  const { id, nextStep, detailMotel } = useCreateMotelStore()
  const [location, setLocation] = useState<Location>({
    city: detailMotel?.location?.city || "",
    district: detailMotel?.location?.district || "",
    ward: detailMotel?.location?.ward || "",
    street: detailMotel?.location?.street || "",
    other: detailMotel?.location?.other || "",
    longitude: detailMotel?.location?.longitude || null,
    latitude: detailMotel?.location?.latitude || null,
  })
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setViewState({
          ...viewState,
          longitude,
          latitude,
        })
        setCurrent({
          longitude,
          latitude,
        })
      }
    )
  }, [])

  const handleCreateLocation = () => {
    if (id) {
      createLocation({ motelId: id, data: location })
      nextStep()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLocationClick = ({ lon, lat }: { lon: number; lat: number }) => {
    setLocation({
      ...location,
      longitude: lon,
      latitude: lat,
    })
    setViewState({
      // ...viewState,
      zoom: 18,
      longitude: lon,
      latitude: lat,
    })
  }

  useEffect(() => {
    if (location.city) {
      setDistrictList(getDistricts(location.city))
    }
    if (location.district) {
      setWardList(getWards(location.city, location.district))
    }
  }, [location.city, location.district])

  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="w-full max-w-[800px] mx-auto mb-20">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Thêm vị trí
          </DecorativeHeading>

          <div className="flex flex-col gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="city">Tỉnh, thành phồ</Label>
                <Select
                  defaultValue={location.city}
                  onValueChange={(value) => {
                    setLocation({ ...location, city: value })
                    setDistrictList(getDistricts(value))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">Quận huyện</Label>
                <Select
                  defaultValue={location.district}
                  onValueChange={(value) => {
                    setLocation({ ...location, district: value })
                    setWardList(getWards(location.city, value))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {districtList?.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ward">Xã, Phường</Label>
                <Select
                  defaultValue={location.ward}
                  onValueChange={(value) => {
                    setLocation({ ...location, ward: value })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {wardList.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[180px]">
                <Label htmlFor="city">Đường</Label>
                <Input
                  placeholder="Tên đường..."
                  value={location.street}
                  onChange={(e) =>
                    setLocation({ ...location, street: e.target.value })
                  }
                ></Input>
              </div>
            </div>
            <div className="w-full flex gap-3 items-end">
              <div className="flex-1 ">
                <Label htmlFor="city">Địa chỉ khác (Tự chọn)</Label>
                <Input
                  placeholder={`Ấp, xóm,..`}
                  value={location.other}
                  onChange={(e) =>
                    setLocation({ ...location, other: e.target.value })
                  }
                />
              </div>
              <LocationsPopover
                location={location}
                onLocationClick={onLocationClick}
              />
            </div>
            <div className="h-[400px] rounded-xl">
              <BaseMap viewState={viewState}>
                {location.longitude && location.latitude && (
                  <Marker
                    draggable
                    longitude={location.longitude}
                    latitude={location.latitude}
                    onDrag={(e) =>
                      setLocation({
                        ...location,
                        longitude: e.lngLat.lng,
                        latitude: e.lngLat.lat,
                      })
                    }
                  >
                    <MapPinIcon size={32} fill="#009639" strokeWidth={1} />
                  </Marker>
                )}
                <Marker
                  longitude={current.longitude}
                  latitude={current.latitude}
                >
                  <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
                </Marker>
              </BaseMap>
            </div>
          </div>
        </div>

        <CreateProgress
          disableNext={
            location.longitude === null || location.latitude === null
          }
          onNextClick={handleCreateLocation}
        />
      </div>
    </div>
  )
}

export default LocationInfo
