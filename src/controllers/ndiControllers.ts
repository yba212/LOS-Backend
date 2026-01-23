import { Request, Response } from "express"
import { createNDISession, getNDISession } from "../services/ndi.services"

export const createSession = async (_: Request, res: Response) => {
  const session = await createNDISession()
  res.json(session)
}

export const getSessionStatus = (req: Request, res: Response) => {
  const session = getNDISession(req.params.sessionId)
  if (!session) {
    return res.status(404).json({ status: "NOT_FOUND" })
  }
  res.json(session)
}
