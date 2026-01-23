import axios from "axios"
import https from "https"
import { ndiAuthConfig } from "../config/ndiConfig"

export interface NDIAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export const authenticateWithNDI = async (): Promise<NDIAuthResponse> => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // DEV ONLY
    })

    const response = await axios.post<NDIAuthResponse>(
      ndiAuthConfig.authUrl,
      {
        client_id: ndiAuthConfig.clientId,
        client_secret: ndiAuthConfig.clientSecret,
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        httpsAgent,
      }
    )

    return response.data
  } catch (error: any) {
    console.error("NDI AUTH ERROR STATUS:", error.response?.status)
    console.error("NDI AUTH ERROR DATA:", error.response?.data)
    console.error("NDI AUTH ERROR MESSAGE:", error.message)
    throw new Error(error.response?.data || error.message)
  }
}
