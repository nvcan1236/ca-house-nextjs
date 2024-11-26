import { ReactNode } from "react";
import { postType, reactions, appointmentStatus } from "./predefined-data";

export type language = "vi" | "en";
export type role = "motel" | "post";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  avatar: string;
  noPassword: boolean;
};

export type UserRole = "USER" | "OWNER" | "ADMIN";

export type Permission = {
  name: string;
  description: string;
};

export type Profile = {
  dob: string;
  phone: string;
  messenger: string;
  occupation: Job;
};

export type DetailUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  profile: Profile | null;
};

export type Image = {
  id: string;
  url: string;
};

export type MotelType = {
  label: string;
  icon: ReactNode;
  value: string;
};

export type Location = {
  city: string;
  district: string;
  ward: string;
  street: string;
  other: string;
  longitude: number | null;
  latitude: number | null;
};

export type Amenity = { name: string; type: string };

export type Price = {
  type: PredefinePrice;
  name: string;
  value: number | null;
  unit: string;
  units: string[];
};

export type Requirement = {
  deposit: number;
  contractAmount: number;
  allowPet: boolean;
  jobs: Job[];
  other: string | null;
};

export type PredefinePrice =
  | "ELECTRICITY"
  | "WATER"
  | "INTERNET"
  | "PARKING"
  | "SERVICE"
  | "ORTHER";

export type MotelStatus = {
  label: string;
  value: "RENTING" | "AVAILABLE";
};

export type Job = "STUDENT" | "WORKER" | "OFFICER" | "FREELANCER" | "OTHER";

export type Reaction = {
  type: "LIKE" | "SAD" | "HAPPY" | "ANGRY";
  icon: ReactNode;
};

export type ApiResponse<T> = {
  code: number;
  result: T;
  message: string;
};

export interface PageResult<T> {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalElement: number;
  data: T[];
}

export type LoginForm = {
  username: string;
  password: string;
};

export type TokenData = {
  authenticated: boolean;
  token: string;
};

export type CreatePasswordData = { password: string; rePassword: string };

export type PostType = keyof typeof postType;

export type SuggestContent = {
  location: string;
  area: number;
  budget: number;
  amenity: string;
  post_type: PostType;
};

export type ReviewRequest = {
  content: string;
};

export type Review = {
  id: string;
  createdBy: string;
  createdAt: string;
  content: string;
};

export type Appointment = {
  id: string;
  userId: string;
  createdAt: string;
  status: keyof typeof appointmentStatus;
  date: string;
};

export type UserStat = {
  byPeriod: ByPeriod[];
  byRole: ByRole[];
};

export type ByPeriod = {
  period: string;
  userCount: number;
  ownerCount: number;
};

export type ByRole = {
  role: string;
  count: number;
};

export type MotelStat = {
  byType: ByType[];
  byPrice: ByPrice[];
  byArea: ByArea[];
  byPeriod: MotelByPeriod[];
};

export type ByType = {
  type: string;
  count: number;
};

export type ByPrice = {
  range: number;
  count: number;
};

export type ByArea = {
  range: number;
  count: number;
};

export type MotelByPeriod = {
  period: string;
  count: number;
};

export interface PostStat {
  byPeriod: ByPostPeriod[];
  byType: ByPostType[];
}

export interface ByPostPeriod {
  period: string;
  count: number;
}

export interface ByPostType {
  type: string;
  count: number;
}

export type ReservationCreationResponse = {
  paymentUrl: string;
  reservationId: string;
};

export type ReservationResponse = {
  id: string;
  createdBy: string;
  createdAt: string;
  status: "PENDING" | "PAYMENT_SUCCESS" | "PAYMENT_FAIL";
  amount: number;
  motelId: string;
};

export interface IMotel {
  id: string;
  name: string;
  area: number;
  price: number;
  type: string;
  availableDate: string;
  status: "RENTING" | "AVAILABLE" | "BANNED" | "NOT_APPROVED" | "RESERVED";
  createdAt: string;
  images: Image[];
  longitude: number;
  latitude: number;
  district: string;
  city: string;
  approved: boolean;
}

export interface IMotelDetail extends IMotel {
  description: string;
  ownerId: string;
  owner: User;
  amenities: Amenity[];
  requirement: Requirement;
  prices: Omit<Price, "units">[];
  images: Image[];
  location: Location;
}

export interface Step {
  component: React.ReactNode;
  href: string;
  nextStepHref: string | null;
}

export interface Steps {
  regular: Step;
  location: Step;
  amenities: Step;
  images: Step;
  prices: Step;
  requirements: Step;
}

export interface RegularCreate {
  name: string;
  description: string;
  price: number;
  type: string;
  area: number;
  availableDate: string;
}

// Kiểu dữ liệu cho Ward (Phường/Xã)
export interface Ward {
  name: string;
}

// Kiểu dữ liệu cho District (Quận/Huyện)
export interface District {
  name: string;
  wards: Ward[]; // Mảng các phường/xã thuộc quận/huyện này
}

// Kiểu dữ liệu cho Province (Tỉnh/Thành phố)
export interface Province {
  name: string;
  districts: District[]; // Mảng các quận/huyện thuộc tỉnh/thành phố này
}

export interface IPost {
  content: string;
  id: string;
  type: keyof typeof postType;
  create_by: string;
  images: Image[];
  comment_count: number;
  react_count: number;
  liked: keyof typeof reactions | null;
  create_at: string;
  owner: User;
}

export interface IComment {
  id: string;
  create_at: string;
  post_id: string;
  user_id: string;
  content: string;
  reply_to: unknown;
  owner: User;
}

export interface ICommentCreate {
  content: string;
}

export interface IPostCreate {
  content: string;
  type: keyof typeof postType;
}

// Chat Interface
export interface ChatUser {
  id: string;
  avatar: string;
  displayName: string;
  role: UserRole[];
}

export interface ChatRoom {
  id: string;
  member: string[];
  createdAt: CreatedAt;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  createdBy: string;
  type: "text" | "image";
  createdAt: CreatedAt;
  content: string[];
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface CreateMessage {
  content?: string;
  type: "TEXT" | "IMAGE";
  recipient: string;
  images?: FileList | [];
}
