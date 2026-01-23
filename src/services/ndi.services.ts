import { v4 as uuidv4 } from "uuid"
import { NDISession } from "../models/NDISession"

const sessions: Record<string, NDISession> = {}

export const createNDISession = () => {
  const sessionId = uuidv4()

  const session: NDISession = {
    sessionId,
    status: "PENDING",
    createdAt: new Date()
  }

  sessions[sessionId] = session

  return {
    sessionId,
    qrData: JSON.stringify({
      sessionId,
      purpose: "eKYC",
      callbackUrl: process.env.NDI_WEBHOOK_URL
    })
  }
}

export const getNDISession = (sessionId: string) => {
  return sessions[sessionId]
}

export const verifySession = (sessionId: string, userData: any) => {
  if (sessions[sessionId]) {
    sessions[sessionId].status = "VERIFIED"
    sessions[sessionId].userData = userData
  }
}
