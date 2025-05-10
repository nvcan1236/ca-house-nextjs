/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { getCoordinate } from "@/services/map-service"

import { Location } from "@/types/motel"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

const LocationsPopover = ({
  location,
  onLocationClick,
}: {
  location: Location
  onLocationClick: ({ lon, lat }: { lon: number; lat: number }) => void
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [locationList, setLocationList] = useState<any[]>()
  const [open, setOpen] = useState(false)
  const handleGetCoordinate = async () => {
    const coord = await getCoordinate({
      city: location.city,
      district: location.district,
      street: location.street,
      ward: location.ward,
    })
    setLocationList(coord.data.features)
  }

  const handleClickLocation = (loc: any) => {
    onLocationClick({
      lon: loc.geometry.coordinates[0],
      lat: loc.geometry.coordinates[1],
    })
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" onClick={handleGetCoordinate}>
          Xem trên Map
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="lg:w-[600px]">
        <ScrollArea className="h-[320px]">
          <ul>
            {locationList?.map((loc) => (
              <li
                className="px-4 py-2 hover:bg-main-yellow-t9 transition-all"
                onClick={() => handleClickLocation(loc)}
                key={loc.id}
              >
                {loc.place_name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default LocationsPopover
