// import { Request, Response } from "express"
// import QRCode from "qrcode"
// import { createProofRequest } from "../services/ndiVerifier.service"

// export const requestUserProof = async (req: Request, res: Response) => {
//   // 1️⃣ Extract access token from Authorization header
//   const authHeader = req.headers.authorization || ""
//   const accessToken = authHeader.startsWith("Bearer ")
//     ? authHeader.split(" ")[1]
//     : undefined

//   if (!accessToken) {
//     return res.status(400).json({
//       message: "Authorization token missing or invalid",
//     })
//   }

//   try {
//     // 2️⃣ Call existing service (UNCHANGED)
//     const ndiResponse = await createProofRequest(accessToken)

//     /**
//      * Expected structure from service:
//      * {
//      *   statusCode,
//      *   message,
//      *   data: {
//      *     proofRequestName,
//      *     proofRequestThreadId,
//      *     proofRequestURL,
//      *     deepLinkURL
//      *   }
//      * }
//      */
//     const {
//       proofRequestURL,
//       proofRequestThreadId,
//       proofRequestName,
//       deepLinkURL,
//     } = ndiResponse.data

//     // 3️⃣ Generate QR from ProofRequestURL
//     const qrDataUrl = await QRCode.toDataURL(proofRequestURL)

//     // 4️⃣ Respond to frontend
//     return res.status(201).json({
//       statusCode: 201,
//       message: "Proof URL created successfully",
//       data: {
//         proofRequestName,
//         proofRequestThreadId,
//         proofRequestURL,
//         deepLinkURL,
//         qrDataUrl,
//       },
//     })
//   } catch (error: any) {
//     return res.status(500).json({
//       message: "Failed to create proof request",
//       error: error.message,
//     })
//   }
// }
