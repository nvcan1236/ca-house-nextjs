import React, { PropsWithChildren, useEffect, useState } from "react"
import envConfig from "@/configs/env-config"
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl"

const MAP_TOKEN = envConfig.NEXT_PUBLIC_MAP_TOKEN

const BaseMap = ({
  children,
  onMoveEnd,
  viewState,
}: PropsWithChildren & {
  onMoveEnd?: (e: ViewStateChangeEvent) => void
  viewState?: Partial<ViewState>
}) => {
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  })

  const [viewStateState, setViewStateState] = useState({
    longitude: viewState?.longitude || current.longitude,
    latitude: viewState?.latitude || current.latitude,
    zoom: 15,
  })

  useEffect(() => {
    if (!viewState?.longitude || !viewState.latitude) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          setViewStateState({
            ...viewStateState,
            longitude,
            latitude,
          })
          setCurrent({
            ...current,
            longitude,
            latitude,
          })
        }
      )
    }
    else {
      setViewStateState({
        ...viewStateState,
        longitude: viewState?.longitude,
        latitude: viewState?.latitude,
      })
    }
  }, [viewState?.longitude, viewState?.latitude])

  const handleMoveEnd = (e: ViewStateChangeEvent) => {
    onMoveEnd?.(e)
  }

  return (
    <div className="w-full h-full relative">
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        initialViewState={{
          latitude: viewState?.latitude,
          longitude: viewState?.longitude,
          zoom: 10,
        }}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewStateState(evt.viewState)}
        onMoveEnd={handleMoveEnd}
        {...viewStateState}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {children}
      </ReactMapGL>
    </div>
  )
}

export default BaseMap
