import envConfig from "./env-config"

const GEO_API_KEY = envConfig.NEXT_PUBLIC_GEO_API_KEY
const MAP_TOKEN = envConfig.NEXT_PUBLIC_MAP_TOKEN

export const geoMapEndpoint = (address: string) =>
  `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}`
export const reverseGeoMapEndpoint = (
  lon: number,
  lat: number,
  limit: number = 1
) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${MAP_TOKEN}&limit=${limit}`
