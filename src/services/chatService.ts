import { useState } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { useMutation, useQuery } from "@tanstack/react-query"

import { ChatMessage, RoomChat } from "@/types/chat"
import { ApiResponse } from "@/types/common"
import { getPartnerChat } from "@/lib/utils"

import { authAxios, formDataAxios } from "./axios"
import webSocketService from "./webSocketService"

// const db = getFirestore(app)

// export const getUsers = async (): Promise<ChatUser[]> => {
//   const userCollectionsRef = collection(db, "User")
//   const userCollectionSnap = await getDocs(userCollectionsRef)
//   return userCollectionSnap.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   })) as ChatUser[]
// }

// export const getUserByUserName = async (
//   username: string
// ): Promise<ChatUser> => {
//   const docRef = doc(db, "ChatUser", username)
//   const docSnap = await getDoc(docRef)
//   return docSnap.data() as ChatUser
// }

// export const getRoomByUser = (
//   userId: string,
//   onRoomUpdate: (rooms: RoomChat[]) => void
// ) => {
//   try {
//     const roomCollectionsRef = collection(db, "RoomChat")

//     const q = query(
//       roomCollectionsRef,
//       where("member", "array-contains", userId)
//     )

//     const unsub = onSnapshot(q, (snapShort) => {
//       const newRooms: RoomChat[] = snapShort.docs.map(
//         (doc) =>
//           ({
//             ...doc.data(),
//             id: doc.id,
//           }) as RoomChat
//       )
//       onRoomUpdate(newRooms)
//     })

//     return unsub
//   } catch (error) {
//     console.error("Error getting room by user:", error)
//     return () => {}
//   }
// }

// export const getRoomByWithUser = async (
//   username: string,
//   me: string
// ): Promise<RoomChat> => {
//   try {
//     const rooms: RoomChat[] = []
//     const roomCollectionsRef = collection(db, "RoomChat")
//     const q = query(roomCollectionsRef, where("member", "array-contains", me))
//     const roomsSnap = await getDocs(q)

//     roomsSnap.forEach((doc) => {
//       if (doc.data().member.includes(username)) {
//         rooms.push({ ...doc.data(), id: doc.id } as RoomChat)
//       }
//     })
//     if (rooms.length) {
//       return rooms[0]
//     }
//     return {
//       createdAt: { nanoseconds: 0, seconds: 0 },
//       id: "",
//       members: [me, username],
//     }
//   } catch (error) {
//     console.error("Error getting messages in room:", error)
//     return {
//       createdAt: { nanoseconds: 0, seconds: 0 },
//       id: "",
//       members: [me, username],
//     }
//   }
// }

// export const getMessagesInRoom = (
//   roomId: string,
//   onMessagesUpdate: (messages: ChatMessage[]) => void
// ) => {
//   try {
//     const roomCollectionsRef = collection(db, "Message")

//     const q = query(
//       roomCollectionsRef,
//       where("roomId", "==", roomId),
//       orderBy("createdAt"),
//       limit(10)
//     )

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       // const messages: ChatMessage[] = snapshot.docs.map((doc) => {
//       //   const data = doc.data()
//       //   return { id: doc.id, ...data } as ChatMessage
//       // })
//       // onMessagesUpdate(messages)
//     })

//     return unsubscribe
//   } catch (error) {
//     console.error("Error getting messages in room:", error)
//     return () => {}
//   }
// }

// export function formatCreatedAt(createdAt: CreatedAt) {
//   const milliseconds =
//     createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
//   const date = new Date(milliseconds)
//   return date.toLocaleString("vi-VN") // hiển thị theo định dạng ngày giờ của Việt Nam
// }

// CHAT BY WEBSOCKET

// http://localhost:8888/api/chat
export const useGetMessages = (roomId: string) => {
  return useQuery<ApiResponse<ChatMessage[]>>({
    queryKey: ["chat-message"],
    queryFn: async () => {
      const res = await authAxios.get(
        `http://localhost:8888/api/chat/messages/${roomId}`
      )
      return res.data
    },
    enabled: !!roomId,
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
        `http://localhost:8888/api/chat/upload`,
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
        "http://localhost:8888/api/chat/room"
      )
      return res.data
    },
  })
}
