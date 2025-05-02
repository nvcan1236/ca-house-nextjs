import { Client } from "@stomp/stompjs"

import { ChatMessage } from "@/types/chat"

import { getToken } from "./localStorageService"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

class WebSocketService {
  private client: Client | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(
    roomId: string,
    username: string,
    onMessageReceived: (message: ChatMessage) => void,
    onRoomReceived: () => void
  ) {
    const token = getToken()
    this.client = new Client({
      brokerURL: SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        this.client?.subscribe(`/topic/chat/${roomId}`, (message) => {
          if (onMessageReceived) {
            onMessageReceived(JSON.parse(message.body))
          }
        })

        this.client?.subscribe(`/topic/room/${username}`, () => {
          if (onRoomReceived) {
            onRoomReceived()
          }
        })
      },
      onDisconnect: () => {
        console.log("❌ Disconnected from WebSocket")
      },
      onStompError: (frame) => {
        console.error("⚠ WebSocket Error:", frame)
      },
    })

    this.client.activate()
  }

  sendMessage(roomId: string, message: ChatMessage) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: `/app/chat/send/${roomId}`,
        body: JSON.stringify(message),
      })
    } else {
      console.warn("⚠ WebSocket is not connected")
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate()
    }
  }
}

const webSocketService = new WebSocketService()
export default webSocketService
