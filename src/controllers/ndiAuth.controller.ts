import { Request, Response } from "express"
import { authenticateWithNDI } from "../services/ndiAuth.service"

export const getNDIAccessToken = async (_req: Request, res: Response) => {
  try {
    const data = await authenticateWithNDI()
    res.json(data)
    console.log("NDI authentication successful:", data)
  } catch (error: any) {
    res.status(500).json({ message: "NDI authentication failed", error: error.message })
  }
}
