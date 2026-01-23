export interface NDISession {
  sessionId: string
  status: "PENDING" | "VERIFIED" | "EXPIRED"
  userData?: any
  createdAt: Date
}
