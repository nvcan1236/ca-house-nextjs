import { geoMapEndpoint, reverseGeoMapEndpoint } from "@/configs/mapbox-config"

import axios from "./axios"

export const getCoordinate = async ({
  ward,
  city,
  district,
  street,
}: {
  ward: string
  district: string
  city: string
  street: string
}) => {
  const data = await axios.get(
    geoMapEndpoint(`${street},${ward},${district},${city}`)
  )

  return data
}

export const getAddressFromCoord = async (lon: number, lat: number) => {
  const data = await axios.get(
    reverseGeoMapEndpoint(lon, lat)
  )

  return data
}
