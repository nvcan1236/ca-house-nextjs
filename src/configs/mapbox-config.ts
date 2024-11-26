const GEO_API_KEY = "66cda0de0c6d0580720717ocb2d7496"

export const geoMapEndpoint = (address:string) => `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}` 