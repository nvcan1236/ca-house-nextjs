/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"
import {
  AirVentIcon,
  AngryIcon,
  ArmchairIcon,
  BedIcon,
  BikeIcon,
  Building,
  BusFrontIcon,
  BusIcon,
  CarrotIcon,
  CctvIcon,
  DoorClosedIcon,
  FireExtinguisherIcon,
  FrownIcon,
  HeartIcon,
  HeaterIcon,
  HospitalIcon,
  HouseIcon,
  ImagesIcon,
  MapPinHouseIcon,
  MessageCircleWarningIcon,
  RefrigeratorIcon,
  School2Icon,
  SchoolIcon,
  ShirtIcon,
  SmileIcon,
  SoupIcon,
  SquareSplitVertical,
  StoreIcon,
  ThumbsUpIcon,
  WalletIcon,
  WashingMachineIcon,
  WifiIcon,
} from "lucide-react"

import { AppointmentStatus, Job, Price, Step } from "@/types/motel"
import { PostType, ReactionType } from "@/types/post"
import AmenityInfo from "@/components/motel/create/amenity-infor"
import LocationInfo from "@/components/motel/create/location-infor"
import PriceInfo from "@/components/motel/create/price-infor"
import RegularInfo from "@/components/motel/create/regular-infor"
import RequirementInfo from "@/components/motel/create/requirement-infor"
import UploadMotelImage from "@/components/motel/create/update-motel-image"

type MotelTypeDetail = {
  label: string
  icon: ReactNode
  value: string
}

export const motelTypes: MotelTypeDetail[] = [
  {
    label: "Phòng đơn",
    icon: <HouseIcon size={32}></HouseIcon>,
    value: "SINGLE_ROOM",
  },
  {
    label: "Nhà nguyên căn",
    icon: <SchoolIcon size={32}></SchoolIcon>,
    value: "WHOLE_HOUSE",
  },
  {
    label: "Căn hộ chung cư",
    icon: <Building size={32}></Building>,
    value: "APARTMENT",
  },
  {
    label: "Ký túc xá",
    icon: <BedIcon size={32}></BedIcon>,
    value: "DORMITORY",
  },
]

type MotelStatusDetail = {
  label: string
  value: "RENTING" | "AVAILABLE"
}

export const motelStatus: MotelStatusDetail[] = [
  {
    label: "Còn sẵn",
    value: "AVAILABLE",
  },
  {
    label: "Đang cho thuê",
    value: "RENTING",
  },
]

export const services: { [key: string]: any } = {
  GARAGE: {
    label: "Nhà gửi xe",
    value: "GARAGE",
    icon: <BikeIcon size={32} className="text-main-blue-s5" />,
  },
  IRON: {
    label: "Dịch vụ giặt ủi",
    value: "IRON",
    icon: <WashingMachineIcon size={32} className="text-main-blue-s5" />,
  },
  SECURITY: {
    label: "An ninh, bảo vệ",
    value: "SECURITY",
    icon: <CctvIcon size={32} className="text-main-blue-s5" />,
  },
  FIRE_PROTECTION: {
    label: "Phòng cháy chữa cháy",
    value: "FIRE_PROTECTION",
    icon: <FireExtinguisherIcon size={32} className="text-main-blue-s5" />,
  },
  INTERNET: {
    label: "Wifi, Internet",
    value: "INTERNET",
    icon: <WifiIcon size={32} className="text-main-blue-s5" />,
  },
  ELEVATOR: {
    label: "Thang máy",
    value: "ELEVATOR",
    icon: <DoorClosedIcon size={32} className="text-main-blue-s5" />,
  },
}

export const furnitures: { [key: string]: any } = {
  BED: {
    label: "Giường, nệm",
    value: "BED",
    icon: <BedIcon size={32} className="text-main-blue-s5" />,
  },
  FRIDGE: {
    label: "Tủ lạnh",
    value: "FRIDGE",
    icon: <RefrigeratorIcon size={32} className="text-main-blue-s5" />,
  },
  WASHING_MACHINE: {
    label: "Máy giặt",
    value: "WASHING_MACHINE",
    icon: <WashingMachineIcon size={32} className="text-main-blue-s5" />,
  },
  MEZANIN: {
    label: "Gác",
    value: "MEZANIN",
    icon: <SquareSplitVertical size={32} className="text-main-blue-s5" />,
  },
  WARDROBE: {
    label: "Tủ, giá treo đồ",
    value: "WARDROBE",
    icon: <ShirtIcon size={32} className="text-main-blue-s5" />,
  },
  KITCHEN: {
    label: "Bếp, kệ bếp",
    value: "KITCHEN",
    icon: <HeaterIcon size={32} className="text-main-blue-s5" />,
  },
  AC: {
    label: "Máy lạnh",
    value: "AC",
    icon: <AirVentIcon size={32} className="text-main-blue-s5" />,
  },
  TABLE: {
    label: "Bàn ghế",
    value: "TABLE",
    icon: <ArmchairIcon size={32} className="text-main-blue-s5" />,
  },
}

export const facilities: { [key: string]: any } = {
  HOSPITAL: {
    label: "Nhà thuốc, Bệnh viện",
    value: "HOSPITAL",
    icon: <HospitalIcon size={32} className="text-main-blue-s5" />,
  },
  SCHOOL: {
    label: "Trường học",
    value: "SCHOOL",
    icon: <School2Icon size={32} className="text-main-blue-s5" />,
  },
  MARKET: {
    label: "Chợ, tạp hoá",
    value: "MARKET",
    icon: <CarrotIcon size={32} className="text-main-blue-s5" />,
  },
  SUPERMARKET: {
    label: "Siêu thị, cửa hàng",
    value: "SUPERMARKET",
    icon: <StoreIcon size={32} className="text-main-blue-s5" />,
  },
  FOOD_STALL: {
    label: "Nhà hàng, quán ăn",
    value: "FOOD_STALL",
    icon: <SoupIcon size={32} className="text-main-blue-s5" />,
  },
  BUSSTOP: {
    label: "Trạm xe buýt",
    value: "BUSSTOP",
    icon: <BusFrontIcon size={32} className="text-main-blue-s5" />,
  },
  STATION: {
    label: "Bến xe",
    value: "STATION",
    icon: <BusIcon size={32} className="text-main-blue-s5" />,
  },
}
export const prices: Price[] = [
  {
    name: "Điện",
    value: null,
    unit: "kWh",
    units: ["kWh", "month"],
    type: "ELECTRICITY",
  },
  {
    name: "Nước",
    value: null,
    unit: "m3",
    units: ["m3", "month"],
    type: "WATER",
  },
  {
    name: "Internet",
    value: null,
    unit: "month",
    units: ["month"],
    type: "INTERNET",
  },
  {
    name: "Gửi xe",
    value: null,
    unit: "month",
    units: ["month"],
    type: "PARKING",
  },
  {
    name: "Dịch vụ",
    value: null,
    unit: "month",
    units: ["month"],
    type: "SERVICE",
  },
]

export const definedJobs: { [key in Job]: string } = {
  STUDENT: "Học sinh, sinh viên",
  OFFICER: "Nhân viên văn phòng",
  WORKER: "Công nhân",
  FREELANCER: "Làm việc tự do",
  OTHER: "Khác",
} as const

export const reactions: {
  [key in ReactionType]: {
    icon: ReactNode
    label: string
  }
} = {
  LIKE: {
    icon: <ThumbsUpIcon />,
    label: "Like",
  },
  LOVE: {
    icon: <HeartIcon />,
    label: "Love",
  },
  HAPPY: {
    icon: <SmileIcon />,
    label: "Happy",
  },
  SAD: {
    icon: <FrownIcon />,
    label: "Sad",
  },
  ANGRY: {
    icon: <AngryIcon />,
    label: "Angry",
  },
}

export const postType: {
  [key in PostType]: string
} = {
  REVIEW: "Review",
  PASS_ROOM: "Pass phòng",
  FIND_ROOM: "Tìm phòng",
  FIND_ROOMMATE: "Tìm người ở ghép",
}

export const steps: Step[] = [
  {
    component: "Bỏ qua",
    icon: "",
    label: "",
  },
  {
    component: <RegularInfo />,
    icon: <HouseIcon />,
    label: "Thông tin căn hộ",
  },
  {
    component: <LocationInfo />,
    icon: <MapPinHouseIcon />,
    label: "Thông tin địa chỉ",
  },
  {
    component: <AmenityInfo />,
    icon: <ArmchairIcon />,
    label: "Tiện nghi",
  },
  {
    component: <UploadMotelImage />,
    icon: <ImagesIcon />,
    label: "Hình ảnh",
  },
  {
    component: <PriceInfo />,
    icon: <WalletIcon />,
    label: "Giá cả",
  },
  {
    component: <RequirementInfo />,
    icon: <MessageCircleWarningIcon />,
    label: "Yêu cầu",
  },
]

export const appointmentStatus: {
  [key in AppointmentStatus]: string
} = {
  PENDING: "Đang chờ",
  ACCEPT: "Chấp nhận",
  DENY: "Từ chối",
}

export const translations: { [key: PropertyKey]: string } = {
  FACILITY: "Tiện nghi khác",
  SERVICE: "Dịch vụ",
  ELEVATOR: "Thang máy",
  IRON: "Dịch vụ giặt ủi",
  GARAGE: "Nhà để xe",
  AC: "Điều hòa",
  TABLE: "Bàn ghế",
  STATION: "Nhà ga",
  BUSSTOP: "Trạm xe buýt",
  FOOD_STALL: "Quán ăn",
  MARKET: "Chợ",
  FURNITURE: "Nội thất",
  SUPERMARKET: "Siêu thị",
  FRIDGE: "Tủ lạnh",
  WASHING_MACHINE: "Máy giặt",
  SECURITY: "An ninh",
  FIRE_PROTECTION: "PCCC",
  HOSPITAL: "Bệnh viện",
  INTERNET: "Internet/Wifi",
  SCHOOL: "Trường học",
  deposit: "Tiền đặt cọc",
  contractAmount: "Số tháng hợp đồng",
  allowPet: "Cho phép vật nuôi",
  jobs: "Đối tượng cho thuê",
  other: "Khác",
}
