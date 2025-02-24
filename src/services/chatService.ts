import app from "@/configs/firebase-config"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { ChatMessage, ChatRoom, ChatUser, CreatedAt } from "@/types/chat"

const db = getFirestore(app)

export const getUsers = async (): Promise<ChatUser[]> => {
  const userCollectionsRef = collection(db, "User")
  const userCollectionSnap = await getDocs(userCollectionsRef)
  return userCollectionSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ChatUser[]
}

export const getUserByUserName = async (
  username: string
): Promise<ChatUser> => {
  const docRef = doc(db, "ChatUser", username)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as ChatUser
}

export const getRoomByUser = (
  userId: string,
  onRoomUpdate: (rooms: ChatRoom[]) => void
) => {
  try {
    const roomCollectionsRef = collection(db, "RoomChat")

    const q = query(
      roomCollectionsRef,
      where("member", "array-contains", userId)
    )

    const unsub = onSnapshot(q, (snapShort) => {
      const newRooms: ChatRoom[] = snapShort.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as ChatRoom
      )
      onRoomUpdate(newRooms)
    })

    return unsub
  } catch (error) {
    console.error("Error getting room by user:", error)
    return () => {}
  }
}

export const getRoomByWithUser = async (
  username: string,
  me: string
): Promise<ChatRoom> => {
  try {
    const rooms: ChatRoom[] = []
    const roomCollectionsRef = collection(db, "RoomChat")
    const q = query(roomCollectionsRef, where("member", "array-contains", me))
    const roomsSnap = await getDocs(q)

    roomsSnap.forEach((doc) => {
      if (doc.data().member.includes(username)) {
        rooms.push({ ...doc.data(), id: doc.id } as ChatRoom)
      }
    })
    if (rooms.length) {
      return rooms[0]
    }
    return {
      createdAt: { nanoseconds: 0, seconds: 0 },
      id: "",
      member: [me, username],
    }
  } catch (error) {
    console.error("Error getting messages in room:", error)
    return {
      createdAt: { nanoseconds: 0, seconds: 0 },
      id: "",
      member: [me, username],
    }
  }
}

export const getMessagesInRoom = (
  roomId: string,
  onMessagesUpdate: (messages: ChatMessage[]) => void
) => {
  try {
    const roomCollectionsRef = collection(db, "Message")

    const q = query(
      roomCollectionsRef,
      where("roomId", "==", roomId),
      orderBy("createdAt"),
      limit(10)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data()
        return { id: doc.id, ...data } as ChatMessage
      })
      onMessagesUpdate(messages)
    })

    return unsubscribe
  } catch (error) {
    console.error("Error getting messages in room:", error)
    return () => {}
  }
}

export function formatCreatedAt(createdAt: CreatedAt) {
  const milliseconds =
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  const date = new Date(milliseconds)
  return date.toLocaleString("vi-VN") // hiển thị theo định dạng ngày giờ của Việt Nam
}
