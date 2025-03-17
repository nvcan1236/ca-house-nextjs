import { RoomChat } from "@/types/chat"
import { create } from "zustand"

export type ChatState = {
  chatOpen: boolean
  currentRoom: RoomChat | null
}

export type ChatActions = {
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  setCurrentRoom: (room: RoomChat | null) => void
}

type ChatStore = ChatState & ChatActions

const initChatState: ChatState = { chatOpen: false, currentRoom: null }

export const useChatStore = create<ChatStore>((set) => ({
  ...initChatState,
  closeChat: () => set(() => ({ chatOpen: false })),
  openChat: () => set(() => ({ chatOpen: true })),
  setCurrentRoom: (room) => set(() => ({ currentRoom: room })),
  toggleChat: () => set(({ chatOpen }) => ({ chatOpen: !chatOpen })),
}))
