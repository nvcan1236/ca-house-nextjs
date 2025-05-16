import { useState } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { useMutation, useQuery } from "@tanstack/react-query"

import { ChatMessage, RoomChat } from "@/types/chat"
import { ApiResponse } from "@/types/common"
import { getPartnerChat } from "@/lib/utils"

import api, { authAxios, formDataAxios } from "./axios"
import { getToken } from "./localStorageService"
import webSocketService from "./webSocketService"

// http://localhost:8888/api/chat
export const useGetMessages = (roomId: string) => {
  return useQuery<ApiResponse<ChatMessage[]>>({
    queryKey: ["chat-message", roomId],
    queryFn: async () => {
      const res = await api.get(`/chat/messages/${roomId}`)
      return res.data
    },
    enabled: !!roomId && !!getToken(),
  })
}

export const useSendMessage = () => {
  const { mutateAsync: uploadImages, isPending: uploading } =
    useUploadChatImage()
  const { refetch: fetchRooms } = useChatRooms()
  const { currentRoom } = useChatStore()
  const { user } = useAuthStore()
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[] | null>()

  const handleSendMessage = async () => {
    if (!currentRoom || !user) return
    if (files) {
      const { result: urls } = await uploadImages(files)
      urls.forEach((url) => {
        const message: ChatMessage = {
          roomId: currentRoom?.id,
          sender: user?.username || "",
          receiver: "Jane Smith",
          content: "",
          messageType: "IMAGE",
          mediaUrl: url,
          deletedBy: [],
        }
        webSocketService.sendMessage(currentRoom.id, message)
      })
      setFiles(null)
      return
    }

    if (content.trim() !== "") {
      const message: ChatMessage = {
        roomId: currentRoom.id,
        sender: user?.username || "",
        receiver: getPartnerChat(currentRoom).username,
        content: content,
        messageType: "TEXT",
        mediaUrl: null,
        deletedBy: [],
      }
      webSocketService.sendMessage(currentRoom.id, message)

      setContent("")
    }
    fetchRooms()
  }

  return { handleSendMessage, files, setFiles, content, setContent, uploading }
}

export const useUploadChatImage = () => {
  return useMutation({
    mutationKey: ["upload-chat-images"],
    mutationFn: async (files: File[]) => {
      const data: FormData = new FormData()
      Array.from(files).forEach((image) => {
        data.append("images", image)
      })
      const res = await formDataAxios.post<ApiResponse<string[]>>(
        `/chat/upload`,
        data
      )
      return res.data
    },
  })
}

export const useChatRooms = () => {
  return useQuery({
    queryKey: ["get-chat-rooms"],
    queryFn: async () => {
      const res = await authAxios.get<ApiResponse<RoomChat[]>>(
        "/chat/room"
      )
      return res.data
    },
    enabled: !!getToken(),
  })
}
