import React, { PropsWithChildren, useEffect, useState } from "react"
import envConfig from "@/configs/env-config"
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl"

const BaseMap = ({
  children,
  onMoveEnd,
  viewState,
}: PropsWithChildren & {
  onMoveEnd?: (e: ViewStateChangeEvent) => void
  viewState?: Partial<ViewState>
}) => {
  const MAP_TOKEN = envConfig.NEXT_PUBLIC_MAP_TOKEN
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  })

  const [viewStateState, setViewStateState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  })

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (viewState) setViewStateState({ ...viewStateState, ...viewState })
  }, [viewState])

  return (
    <div className="w-full h-full relative">
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewStateState(evt.viewState)}
        onDblClick={console.log}
        onMoveEnd={onMoveEnd}
        {...viewStateState}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <Marker longitude={current.longitude} latitude={current.latitude}>
          {children}
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default BaseMap
