"use client"

import { useEffect, useState } from "react"
import { geoMapEndpoint } from "@/configs/mapbox-config"
import axios from "@/services/axios"
import { useCreateLocationMotel } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { MapPinIcon } from "lucide-react"
import { Marker } from "react-map-gl"

import { District, Ward } from "@/types/common"
import { Location } from "@/types/motel"
import { getDistricts, getProvinces, getWards } from "@/lib/provinces-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DecorativeHeading from "@/components/common/decorative-heading"
import BaseMap from "@/components/map/base-map"

const LocationInfo = () => {
  const provinces = getProvinces()
  const [districtList, setDistrictList] = useState<District[]>([])
  const [wardList, setWardList] = useState<Ward[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [locationList, setLocationList] = useState<any[]>()
  const { mutate: createLocation } = useCreateLocationMotel()
  const { id, nextStep, prevStep } = useCreateMotelStore()
  const [location, setLocation] = useState<Location>({
    city: "",
    district: "",
    ward: "",
    street: "",
    other: "",
    longitude: null,
    latitude: null,
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

  const getCoordinate = async () => {
    axios
      .get(
        geoMapEndpoint(
          `${location?.street},${location?.ward},${location?.district},${location?.city}`
        )
      )
      .then((data) => {
        setLocationList(data.data)
      })
  }

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

  const handleClickLocation = (loc: { lon: number; lat: number }) => {
    setLocation({
      ...location,
      longitude: loc.lon,
      latitude: loc.lat,
    })
    setViewState({
      ...viewState,
      zoom: 18,
      longitude: loc.lon,
      latitude: loc.lat,
    })
  }

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
                  defaultValue={""}
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
                <Label htmlFor="city">Quận huyện</Label>
                <Select
                  defaultValue={""}
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
                <Label htmlFor="citya">Xã, Phường</Label>
                <Select
                  defaultValue={""}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" onClick={getCoordinate}>
                    Xem trên Map
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="lg:w-[600px]">
                  <ul>
                    {locationList?.map((loc) => (
                      <li
                        className="px-4 py-2 hover:bg-main-yellow-t9 transition-all"
                        onClick={() => handleClickLocation(loc)}
                        key={loc.display_name}
                      >
                        {loc.display_name}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
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

        <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t z-20">
          <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
            Quay lại
          </Button>
          <Button
            size={"lg"}
            onClick={handleCreateLocation}
            disabled={location.longitude === null || location.latitude === null}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LocationInfo
