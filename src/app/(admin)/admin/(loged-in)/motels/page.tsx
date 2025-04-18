"use client"

import { useGetMotels } from "@/services/motelApi"
import useFilterStore from "@/stores/filter-store"

import H3 from "@/components/common/h3"
import { columns } from "@/components/motel/motel-column"
import { DataTable } from "@/components/motel/table-data"

const ManageMotel = () => {
  const { roomType, amenities, maxPrice, minPrice, applied } = useFilterStore()
  const { data } = useGetMotels({
    page: 1,
    size: 100,
    filter: { roomType, amenities, maxPrice, minPrice, applied },
  })

  return (
    <div>
      <H3 className="pl-10">Quản lý nhà trọ</H3>
      <div className="mt-6">
        <DataTable columns={columns} data={data?.result.data || []} />
      </div>
    </div>
  )
}

export default ManageMotel

// const data: IMotel[] = [
//   {
//     id: "1",
//     name: "Sunshine Apartment",
//     area: 45,
//     price: 5000000,
//     type: "Apartment",
//     availableDate: "2024-10-01T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-10T12:00:00Z",
//     images: [
//       { url: "https://example.com/image1.jpg", id: "Living room" },
//       { url: "https://example.com/image2.jpg", id: "Bedroom" },
//     ],
//     longitude: 106.700982,
//     latitude: 10.77689,
//     district: "District 1",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "2",
//     name: "Cozy Studio",
//     area: 30,
//     price: 3000000,
//     type: "Studio",
//     availableDate: "2024-10-15T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-11T12:00:00Z",
//     images: [{ url: "https://example.com/image3.jpg", id: "Studio layout" }],
//     longitude: 106.68808,
//     latitude: 10.762622,
//     district: "District 3",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "3",
//     name: "Luxury Villa",
//     area: 250,
//     price: 30000000,
//     type: "Villa",
//     availableDate: "2024-11-01T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-12T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image4.jpg",
//         id: "Villa exterior",
//       },
//       { url: "https://example.com/image5.jpg", id: "Swimming pool" },
//     ],
//     longitude: 106.70606,
//     latitude: 10.774,
//     district: "District 7",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "4",
//     name: "Modern House",
//     area: 150,
//     price: 15000000,
//     type: "House",
//     availableDate: "2024-10-20T12:00:00Z",
//     status: "Pending",
//     createdAt: "2024-09-13T12:00:00Z",
//     images: [{ url: "https://example.com/image6.jpg", id: "Living room" }],
//     longitude: 105.84972,
//     latitude: 21.02851,
//     district: "Tay Ho",
//     city: "Hanoi",
//   },
//   {
//     id: "5",
//     name: "Spacious Office",
//     area: 80,
//     price: 10000000,
//     type: "Office",
//     availableDate: "2024-09-25T12:00:00Z",
//     status: "Occupied",
//     createdAt: "2024-09-14T12:00:00Z",
//     images: [{ url: "https://example.com/image7.jpg", id: "Office space" }],
//     longitude: 105.854444,
//     latitude: 21.022736,
//     district: "Ba Dinh",
//     city: "Hanoi",
//   },
//   {
//     id: "6",
//     name: "Green Condo",
//     area: 60,
//     price: 7000000,
//     type: "Condo",
//     availableDate: "2024-11-05T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-15T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image8.jpg",
//         id: "Condo living room",
//       },
//     ],
//     longitude: 108.21549,
//     latitude: 16.047079,
//     district: "Hai Chau",
//     city: "Da Nang",
//   },
//   {
//     id: "7",
//     name: "Beachfront Apartment",
//     area: 90,
//     price: 9000000,
//     type: "Apartment",
//     availableDate: "2024-12-01T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-16T12:00:00Z",
//     images: [{ url: "https://example.com/image9.jpg", id: "Ocean view" }],
//     longitude: 108.2345,
//     latitude: 16.0745,
//     district: "Son Tra",
//     city: "Da Nang",
//   },
//   {
//     id: "8",
//     name: "Budget Studio",
//     area: 25,
//     price: 2500000,
//     type: "Studio",
//     availableDate: "2024-10-10T12:00:00Z",
//     status: "Pending",
//     createdAt: "2024-09-17T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image10.jpg",
//         id: "Compact space",
//       },
//     ],
//     longitude: 106.70099,
//     latitude: 10.77645,
//     district: "Binh Thanh",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "9",
//     name: "Luxury Penthouse",
//     area: 300,
//     price: 50000000,
//     type: "Penthouse",
//     availableDate: "2024-11-15T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-18T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image11.jpg",
//         id: "Panoramic view",
//       },
//     ],
//     longitude: 105.851493,
//     latitude: 21.030513,
//     district: "Dong Da",
//     city: "Hanoi",
//   },
//   {
//     id: "10",
//     name: "Townhouse",
//     area: 120,
//     price: 12000000,
//     type: "House",
//     availableDate: "2024-11-20T12:00:00Z",
//     status: "Occupied",
//     createdAt: "2024-09-19T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image12.jpg",
//         id: "Townhouse exterior",
//       },
//     ],
//     longitude: 106.70045,
//     latitude: 10.77235,
//     district: "Phu Nhuan",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "11",
//     name: "Downtown Office",
//     area: 100,
//     price: 15000000,
//     type: "Office",
//     availableDate: "2024-09-30T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-20T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image13.jpg",
//         id: "Office interior",
//       },
//     ],
//     longitude: 105.84343,
//     latitude: 21.02776,
//     district: "Hoan Kiem",
//     city: "Hanoi",
//   },
//   {
//     id: "12",
//     name: "Luxury Mansion",
//     area: 500,
//     price: 70000000,
//     type: "Mansion",
//     availableDate: "2024-12-01T12:00:00Z",
//     status: "Pending",
//     createdAt: "2024-09-21T12:00:00Z",
//     images: [
//       {
//         url: "https://example.com/image14.jpg",
//         id: "Mansion front",
//       },
//     ],
//     longitude: 106.67965,
//     latitude: 10.76233,
//     district: "District 2",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "13",
//     name: "Suburban House",
//     area: 130,
//     price: 14000000,
//     type: "House",
//     availableDate: "2024-11-25T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-22T12:00:00Z",
//     images: [{ url: "https://example.com/image15.jpg", id: "Backyard" }],
//     longitude: 106.73821,
//     latitude: 10.80493,
//     district: "Thu Duc",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "14",
//     name: "Riverside Villa",
//     area: 280,
//     price: 35000000,
//     type: "Villa",
//     availableDate: "2024-12-05T12:00:00Z",
//     status: "Occupied",
//     createdAt: "2024-09-23T12:00:00Z",
//     images: [
//       { url: "https://example.com/image16.jpg", id: "Villa by the river" },
//     ],
//     longitude: 105.85671,
//     latitude: 21.01999,
//     district: "Long Bien",
//     city: "Hanoi",
//   },
//   {
//     id: "15",
//     name: "Penthouse Apartment",
//     area: 220,
//     price: 25000000,
//     type: "Penthouse",
//     availableDate: "2024-11-10T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-24T12:00:00Z",
//     images: [{ url: "https://example.com/image17.jpg", id: "City view" }],
//     longitude: 106.69792,
//     latitude: 10.77823,
//     district: "District 10",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "16",
//     name: "Small Office",
//     area: 40,
//     price: 4000000,
//     type: "Office",
//     availableDate: "2024-09-28T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-25T12:00:00Z",
//     images: [
//       { url: "https://example.com/image18.jpg", id: "Office interior" },
//     ],
//     longitude: 106.67505,
//     latitude: 10.78041,
//     district: "Binh Tan",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "17",
//     name: "Hilltop House",
//     area: 180,
//     price: 18000000,
//     type: "House",
//     availableDate: "2024-10-05T12:00:00Z",
//     status: "Pending",
//     createdAt: "2024-09-26T12:00:00Z",
//     images: [{ url: "https://example.com/image19.jpg", id: "Mountain view" }],
//     longitude: 108.21823,
//     latitude: 16.03871,
//     district: "Lien Chieu",
//     city: "Da Nang",
//   },
//   {
//     id: "18",
//     name: "Budget Room",
//     area: 20,
//     price: 2000000,
//     type: "Room",
//     availableDate: "2024-09-20T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-27T12:00:00Z",
//     images: [{ url: "https://example.com/image20.jpg", id: "Simple room" }],
//     longitude: 106.69992,
//     latitude: 10.77832,
//     district: "District 4",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "19",
//     name: "Urban Loft",
//     area: 70,
//     price: 7000000,
//     type: "Loft",
//     availableDate: "2024-10-01T12:00:00Z",
//     status: "Available",
//     createdAt: "2024-09-28T12:00:00Z",
//     images: [
//       { url: "https://example.com/image21.jpg", id: "Loft style apartment" },
//     ],
//     longitude: 106.6901,
//     latitude: 10.77555,
//     district: "District 6",
//     city: "Ho Chi Minh City",
//   },
//   {
//     id: "20",
//     name: "Elegant Condo",
//     area: 85,
//     price: 8500000,
//     type: "Condo",
//     availableDate: "2024-11-01T12:00:00Z",
//     status: "Occupied",
//     createdAt: "2024-09-29T12:00:00Z",
//     images: [
//       { url: "https://example.com/image22.jpg", id: "Elegant design" },
//     ],
//     longitude: 106.68093,
//     latitude: 10.75922,
//     district: "District 9",
//     city: "Ho Chi Minh City",
//   },
// ];
