import { Request, Response } from "express"
import { verifySession } from "../services/ndi.services"

export const ndiWebhook = (req: Request, res: Response) => {
  const { sessionId, user } = req.body

  verifySession(sessionId, user)

  res.sendStatus(200)
}
