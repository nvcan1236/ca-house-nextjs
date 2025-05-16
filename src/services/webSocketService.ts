import { Client } from "@stomp/stompjs"

import { ChatMessage } from "@/types/chat"

import { getToken } from "./localStorageService"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

class WebSocketService {
  private client: Client | null = null
  private isConnecting: boolean = false
  private messageQueue: { roomId: string; message: ChatMessage }[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async connect(
    roomId: string,
    username: string,
    onMessageReceived: (message: ChatMessage) => void,
    onRoomReceived: () => void
  ) {
    if (this.isConnecting) return
    this.isConnecting = true

    const token = getToken()
    this.client = new Client({
      brokerURL: SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000, // Retry every 5 seconds
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.isConnecting = false

        // Process queued messages
        while (this.messageQueue.length > 0) {
          const queued = this.messageQueue.shift()
          if (queued) this.sendMessage(queued.roomId, queued.message)
        }
        this.client?.subscribe(`/topic/chat/${roomId}`, (message) => {
          onMessageReceived?.(JSON.parse(message.body))
        })

        this.client?.subscribe(`/topic/room/${username}`, () => {
          if (onRoomReceived) {
            onRoomReceived()
          }
        })

        // ...existing subscriptions...
      },
      onDisconnect: () => {
        console.log("❌ Disconnected from WebSocket")
      },
      onStompError: (frame) => {
        console.error("⚠ WebSocket Error:", frame)
      },
      // ...existing code...
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
      this.messageQueue.push({ roomId, message })
      console.warn("⚠ WebSocket is not connected, message queued")

      // Try to reconnect
      if (!this.isConnecting) {
        this.connect(
          roomId,
          message.sender,
          () => {
          },
          () => {}
        )
      }
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
