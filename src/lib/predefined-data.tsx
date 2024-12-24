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
  RefrigeratorIcon,
  School2Icon,
  SchoolIcon,
  ShirtIcon,
  SmileIcon,
  SoupIcon,
  StoreIcon,
  ThumbsUpIcon,
  WashingMachineIcon,
  WifiIcon,
} from "lucide-react"

import {
  AppointmentStatus,
  Job,
  MotelStatus,
  MotelType,
  Price,
  Step,
} from "@/types/motel"
import { PostType, ReactionType } from "@/types/post"
import AmenityInfo from "@/components/motel/create/amenity-infor"
import LocationInfo from "@/components/motel/create/location-infor"
import PriceInfo from "@/components/motel/create/price-infor"
import RegularInfo from "@/components/motel/create/regular-infor"
import RequirementInfo from "@/components/motel/create/requirement-infor"
import UploadMotelImage from "@/components/motel/create/update-motel-image"

export const motelTypes: MotelType[] = [
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

export const motelStatus: MotelStatus[] = [
  {
    label: "Còn sẵn",
    value: "AVAILABLE",
  },
  {
    label: "Đang cho thuê",
    value: "RENTING",
  },
]

export const services = [
  {
    label: "Nhà gửi xe",
    value: "GARAGE",
    icon: <BikeIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Dịch vụ giặt ủi",
    value: "IRON",
    icon: <WashingMachineIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "An ninh, bảo vệ",
    value: "SECURITY",
    icon: <CctvIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Phòng cháy chữa cháy",
    value: "FIRE_PROTECTION",
    icon: <FireExtinguisherIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Wifi, Internet",
    value: "INTERNET",
    icon: <WifiIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Thang máy",
    value: "ELEVATOR",
    icon: <DoorClosedIcon size={32} className="text-main-blue-s5" />,
  },
]

export const furnitures = [
  {
    label: "Giường, nệm",
    value: "BED",
    icon: <BedIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Tủ lạnh",
    value: "FRIDGE",
    icon: <RefrigeratorIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Máy giặt",
    value: "WASHING_MACHINE",
    icon: <WashingMachineIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Tủ, giá treo đồ",
    value: "WARDROBE",
    icon: <ShirtIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Bếp, kệ bếp",
    value: "KITCHEN",
    icon: <HeaterIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Máy lạnh",
    value: "AC",
    icon: <AirVentIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Bàn ghế",
    value: "TABLE",
    icon: <ArmchairIcon size={32} className="text-main-blue-s5" />,
  },
]

export const facilities = [
  {
    label: "Nhà thuốc, Bênh viện",
    value: "HOSPITAL",
    icon: <HospitalIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Trường học",
    value: "SCHOOL",
    icon: <School2Icon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Chợ, tạp hoá",
    value: "MARKET",
    icon: <CarrotIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Siêu thị, cửa hàng",
    value: "SUPERMARKET",
    icon: <StoreIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Nhà hàng quán ăn",
    value: "FOOD_STALL",
    icon: <SoupIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Trạm xe bus",
    value: "BUSSTOP",
    icon: <BusFrontIcon size={32} className="text-main-blue-s5" />,
  },
  {
    label: "Bến xe",
    value: "STATION",
    icon: <BusIcon size={32} className="text-main-blue-s5" />,
  },
]
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

export const definedJobs: { type: Job; label: string }[] = [
  {
    type: "STUDENT",
    label: "Học sinh, sinh viên",
  },
  {
    type: "OFFICER",
    label: "Nhân viên văn phòng",
  },
  {
    type: "WORKER",
    label: "Công nhân",
  },
  {
    type: "FREELANCER",
    label: "Làm việc tự do",
  },
  {
    type: "OTHER",
    label: "Khác",
  },
]

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
    component: "",
    href: "/register-motel/regular",
    nextStepHref: "/register-motel/location",
  },

  {
    component: <RegularInfo />,
    href: "/register-motel/regular",
    nextStepHref: "/register-motel/location",
  },
  {
    component: <LocationInfo />,
    href: "/register-motel/regular",
    nextStepHref: "/register-motel/amenity",
  },
  {
    component: <AmenityInfo />,
    href: "/register-motel/amenity",
    nextStepHref: "/register-motel/images",
  },
  {
    component: <UploadMotelImage />,
    href: "/register-motel/images",
    nextStepHref: "/register-motel/prices",
  },
  {
    component: <PriceInfo />,
    href: "/register-motel/prices",
    nextStepHref: "/register-motel/requirements",
  },
  {
    component: <RequirementInfo />,
    href: "/register-motel/reuirements",
    nextStepHref: null,
  },
]

export const appointmentStatus: {
  [key in AppointmentStatus]: string
} = {
  PENDING: "Đang chờ",
  ACCEPT: "Chấp nhận",
  DENY: "Từ chối",
}

export const translations = {
  ELEVATOR: "Thang máy",
  IRON: "Dịch vụ giặt ủi",
  GARAGE: "Nhà để xe",
  AC: "Điều hòa",
  TABLE: "Bàn ghế",
  STATION: "Nhà ga",
  BUSSTOP: "Trạm xe buýt",
  FOOD_STALL: "Quán ăn",
  MARKET: "Chợ",
  FACILITY: "Cơ sở vật chất",
  FURNITURE: "Nội thất",
  SERVICE: "Dịch vụ",
  deposit: "Tiền đặt cọc",
  contractAmount: "Số tháng hợp đồng",
  allowPet: "Cho phép vật nuôi",
  jobs: "Đối tượng cho thuê",
  other: "Khác",
}
