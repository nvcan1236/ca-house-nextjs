const GEO_API_KEY = process.env.NEXT_PUBLIC_GEO_API_KEY

export const geoMapEndpoint = (address:string) => `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}` 