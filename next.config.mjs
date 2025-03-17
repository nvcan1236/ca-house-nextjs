/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ca-house.s3.ap-southeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ca-house.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
}

export default nextConfig
