import envConfig from "./env-config"

const GEO_API_KEY = envConfig.NEXT_PUBLIC_GEO_API_KEY

export const geoMapEndpoint = (address:string) => `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}` 