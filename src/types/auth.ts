import { Job } from "./motel";

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

export type LoginForm = {
  username: string;
  password: string;
};

export type CreatePasswordData = { password: string; rePassword: string };

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
