import { ReactNode, useEffect, useState } from "react"

import BaseMap from "./base-map"

const MapForDetail = ({
  children,
  currentLat,
  currentLon,
}: {
  children?: ReactNode
  currentLon?: number
  currentLat?: number
}) => {
  const [current, setCurrent] = useState({
    latitude: currentLat,
    longitude: currentLon,
  })

  useEffect(() => {
    if (!currentLon || !currentLat) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          setCurrent({
            ...current,
            longitude,
            latitude,
          })
        }
      )
    }
  }, [])

  return (
    <BaseMap viewState={{ longitude: currentLon, latitude: currentLat }}>
      {/* {motelMarkers} */}
      {children}
    </BaseMap>
  )
}

export default MapForDetail
