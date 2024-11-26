import { ChatRoom } from "@/utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  openChat: boolean;
  currentRoom: ChatRoom | null;
} = {
  openChat: false,
  currentRoom: null,
};

export const createChatSlice = createSlice({
  name: "createMotel",
  initialState,
  reducers: {
    openChat: (state) => {
      state.openChat = true;
    },
    closeChat: (state) => {
      state.openChat = false;
    },
    toggleChat: (state) => {
      state.openChat = !state.openChat;
    },
    setCurrentRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { openChat, closeChat, setCurrentRoom, toggleChat } = createChatSlice.actions;
export default createChatSlice.reducer;
