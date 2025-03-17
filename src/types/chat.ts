import { User, UserRole } from "./auth"

export interface ChatUser {
  id: string
  avatar: string
  displayName: string
  role: UserRole[]
}

export const TEMP_CHAT_ID = "tempId"

export interface RoomChat {
  id: string
  members: User[]
  createdAt: string
  lastMessage?: ChatMessage;
}

// export interface ChatMessage {
//   id: string
//   roomId: string
//   createdBy: string
//   type: "text" | "image"
//   createdAt: CreatedAt
//   content: string[]
// }

export type ChatMessage = {
  id?: string
  roomId: string
  sender: string
  receiver: string
  createdAt?: string
  content: string
  messageType: "IMAGE" | "TEXT"
  mediaUrl: string | null
  deletedBy?: string[]
}

export interface CreatedAt {
  seconds: number
  nanoseconds: number
}

export interface CreateMessage {
  content?: string
  type: "TEXT" | "IMAGE"
  recipient: string
  images?: FileList | []
}
