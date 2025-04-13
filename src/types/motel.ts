import { ReactNode } from "react"
import { User } from "./auth"
import { Image } from "./common"

export type PriceType =
  | "ELECTRICITY"
  | "WATER"
  | "INTERNET"
  | "PARKING"
  | "SERVICE"
  | "ORTHER"

export type Location = {
  city: string
  district: string
  ward: string
  street: string
  other: string
  longitude: number | null
  latitude: number | null
}

export type Price = {
  type: PriceType
  name: string
  value: number | null
  unit: string
  units: string[]
}

export type Requirement = {
  deposit: number
  contractAmount: number
  allowPet: boolean
  jobs: Job[]
  other: string | null
}

export interface Step {
  component: React.ReactNode
  icon: ReactNode,
  label: string 
}

export type Job = "STUDENT" | "WORKER" | "OFFICER" | "FREELANCER" | "OTHER"
export interface Steps {
  regular: Step
  location: Step
  amenities: Step
  images: Step
  prices: Step
  requirements: Step
}

export interface RegularCreate {
  name: string
  description: string
  price: number
  type: string
  area: number
  availableDate: string
}

export type ReservationResponse = {
  id: string
  createdBy: string
  createdAt: string
  status: "PENDING" | "PAYMENT_SUCCESS" | "PAYMENT_FAIL"
  amount: number
  motelId: string
}

export type MotelType =
  | "SINGLE_ROOM"
  | "WHOLE_HOUSE"
  | "APARTMENT"
  | "DORMITORY"
export type MotelStatus =
  | "RENTING"
  | "AVAILABLE"
  | "BANNED"
  | "NOT_APPROVED"
  | "RESERVED"

export interface IMotel {
  id: string
  name: string
  area: number
  price: number
  type: MotelType
  availableDate: string
  status: MotelStatus
  createdAt: string
  images: Image[]
  longitude: number
  latitude: number
  district: string
  city: string
  approved: boolean
}

export type AmenityType = "FACILITY" | "FURNITURE" | "SERVICE"

export type Amenity = {
  name: string
  type: AmenityType
}

export interface IMotelDetail extends IMotel {
  description: string
  ownerId: string
  owner: User
  amenities: Amenity[]
  requirement: Requirement
  prices: Price[]
  images: Image[]
  location: Location
}

export type ReviewRequest = {
  content: string
}

export type Review = {
  id: string
  createdBy: string
  createdAt: string
  content: string
}

export type AppointmentStatus = "PENDING" | "ACCEPT" | "DENY"

export type Appointment = {
  id: string
  userId: string
  createdAt: string
  status: AppointmentStatus
  date: string
}

export type MotelByPeriod = {
  period: string
  count: number
}

export type ByType = {
  type: string
  count: number
}

export type ByPrice = {
  range: number
  count: number
}

export type ByArea = {
  range: number
  count: number
}

export type MotelStat = {
  byType: ByType[]
  byPrice: ByPrice[]
  byArea: ByArea[]
  byPeriod: MotelByPeriod[]
}
export type ReservationCreationResponse = {
  paymentUrl: string
  reservationId: string
}
