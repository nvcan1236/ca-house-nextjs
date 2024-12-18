import { UserRole } from "./auth";

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
