// import { Request, Response } from "express";
// import {
//   registerWebhook,
//   requestProof,
//   subscribeWebhook,
// } from "../webhooks/ndiWebhook.service";

// export const startNdiVerification = async (
//   req: Request,
//   res: Response
// ) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];

//   if (!accessToken) {
//     return res
//       .status(400)
//       .json({ message: "Access token required in Authorization header" });
//   }

//   try {
//     // 1️⃣ Register webhook (idempotent)
//     await registerWebhook(accessToken);

//     // 2️⃣ Request proof (QR printed in terminal here)
//     const proofData = await requestProof(accessToken);

//     // 3️⃣ Subscribe webhook using returned threadId
//     await subscribeWebhook(
//       accessToken,
//       proofData.proofRequestThreadId
//     );

//     // 4️⃣ Respond to caller
//     return res.status(201).json({
//       message: "NDI proof request initiated",
//       data: {
//         proofRequestThreadId: proofData.proofRequestThreadId,
//         deepLinkURL: proofData.deepLinkURL,
//       },
//     });
//   } catch (error: any) {
//     console.error("NDI Verification failed:", error);
//     return res.status(500).json({
//       message: "NDI Verification failed",
//       error: error.message,
//     });
//   }
// };


