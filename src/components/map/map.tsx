import { ReactNode, useEffect, useMemo, useState } from "react"
import { useGetNearestMotels } from "@/services/motelApi"
import { Marker, ViewState } from "react-map-gl"

import MotelMarker from "../motel/motel-marker"
import BaseMap from "./base-map"

const Map = ({
  children,
}: {
  children?: ReactNode
  currentLon?:number
  currentLat?:number
}) => {
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCurrent({
          ...current,
          longitude,
          latitude,
        })
      }
    )
  }, [])

  const [filter, setFilter] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    radius: 5000,
  })

  const updateFilter = (viewState: ViewState) => {
    let radius = 5000
    if (viewState.zoom < 11) {
      radius = 10000
    }
    if (viewState.zoom < 10) {
      radius = 30000
    }
    if (viewState.zoom < 9) {
      radius = 40000
    }
    if (viewState.zoom < 8) {
      radius = 80000
    }

    setFilter((prev) => ({
      ...prev,
      longitude: viewState.longitude,
      latitude: viewState.latitude,
      radius: radius,
    }))
  }

  const { data } = useGetNearestMotels({
    lon: filter.longitude,
    lat: filter.latitude,
    radius: filter.radius,
  })

  const motels = data?.result

  const motelMarkers = useMemo(
    () =>
      motels?.map((motel, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={motel.longitude}
          latitude={motel.latitude}
          anchor="bottom"
        >
          <MotelMarker motel={motel}></MotelMarker>
          {children}
        </Marker>
      )),
    [JSON.stringify(motels)]
  )

  return (
    <BaseMap onMoveEnd={({ viewState }) => updateFilter(viewState)} >
      {motelMarkers}
    </BaseMap>
  )
}

export default Map
