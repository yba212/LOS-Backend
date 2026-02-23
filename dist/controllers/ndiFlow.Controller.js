// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.startNdiVerification = void 0;
// const ndiWebhook_service_1 = require("../webhooks/ndiWebhook.service");
// const startNdiVerification = async (req, res) => {
//     const accessToken = req.headers.authorization?.split(" ")[1];
//     if (!accessToken)
//         return res.status(400).json({ message: "Access token required in Authorization header" });
//     try {
//         // 1️⃣ Register webhook
//         await (0, ndiWebhook_service_1.registerWebhook)(accessToken);
//         // 2️⃣ Request proof
//         const proofData = await (0, ndiWebhook_service_1.requestProof)(accessToken);
//         // 3️⃣ Subscribe webhook to this proof's threadId
//         await (0, ndiWebhook_service_1.subscribeWebhook)(accessToken, proofData.proofRequestThreadId);
//         // 4️⃣ Return QR + threadId + proof URL
//         res.json({ message: "Proof request initiated", statusCode: 201, data: proofData });
//     }
//     catch (error) {
//         res.status(500).json({ message: "NDI Verification failed", error: error.message });
//     }
// };
// exports.startNdiVerification = startNdiVerification;
