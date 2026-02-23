// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.ensureWebhookAndRequestProof = exports.requestProof = exports.subscribeWebhook = exports.registerWebhook = exports.fetchRegisteredWebhooks = void 0;
// const axios_1 = __importDefault(require("axios"));
// const https_1 = __importDefault(require("https"));
// const qrcode_1 = __importDefault(require("qrcode"));
// const ndiConfig_1 = require("../config/ndiConfig");
// const httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
// /* -------------------------------------------------------------------------- */
// /*                               Helper Methods                               */
// /* -------------------------------------------------------------------------- */
// const isWebhookAlreadyRegistered = (webhooks, webhookId, webhookURL) => {
//     return webhooks.some((wh) => wh.webhookId === webhookId ||
//         wh.webhookURL === webhookURL);
// };
// /* -------------------------------------------------------------------------- */
// /*                         Fetch Registered Webhooks                           */
// /* -------------------------------------------------------------------------- */
// const fetchRegisteredWebhooks = async (accessToken) => {
//     try {
//         const response = await axios_1.default.get(`${ndiConfig_1.ndiWebhookConfig.baseURL}/webhook/v1`, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             httpsAgent,
//         });
//         return response.data?.data || [];
//     }
//     catch (error) {
//         // console.error("FAILED TO FETCH WEBHOOK LIST:", error.response?.status, error.response?.data || error.message);
//         throw error;
//     }
// };
// exports.fetchRegisteredWebhooks = fetchRegisteredWebhooks;
// /* -------------------------------------------------------------------------- */
// /*                             Register Webhook                                */
// /* -------------------------------------------------------------------------- */
// const registerWebhook = async (accessToken) => {
//     const payload = {
//         webhookId: ndiConfig_1.ndiWebhookConfig.webhookId,
//         webhookURL: ndiConfig_1.ndiWebhookConfig.webhookURL,
//         authentication: {
//             type: "OAuth2",
//             version: "v2",
//             data: {
//                 token: ndiConfig_1.ndiWebhookConfig.fixedAccessToken,
//             },
//         },
//     };
//     try {
//         // console.log("Registering NDI Webhook:", payload);
//         const response = await axios_1.default.post(`${ndiConfig_1.ndiWebhookConfig.baseURL}${ndiConfig_1.ndiWebhookConfig.registerPath}`, payload, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//                 Accept: "*/*",
//             },
//             httpsAgent,
//         });
//         // console.log("Webhook registered successfully");
//         return response.data;
//     }
//     catch (error) {
//         if (error.response?.status === 409) {
//             // console.log("Webhook already exists. Skipping registration.");
//             return;
//         }
//         // console.error("NDI WEBHOOK REGISTER FAILED:", error.response?.status, error.response?.data || error.message);
//         throw error;
//     }
// };
// exports.registerWebhook = registerWebhook;
// /* -------------------------------------------------------------------------- */
// /*                             Subscribe Webhook                               */
// /* -------------------------------------------------------------------------- */
// const subscribeWebhook = async (accessToken, threadId) => {
//     const payload = {
//         webhookId: ndiConfig_1.ndiWebhookConfig.webhookId,
//         threadId,
//     };
//     try {
//         // console.log("Subscribing to NDI Webhook:", payload);
//         const response = await axios_1.default.post(`${ndiConfig_1.ndiWebhookConfig.baseURL}/webhook/v1/subscribe`, payload, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//                 Accept: "*/*",
//             },
//             httpsAgent,
//         });
//         // console.log("Webhook subscription successful");
//         return response.data;
//     }
//     catch (error) {
//         // console.error("NDI WEBHOOK SUBSCRIBE FAILED:", error.response?.status, error.response?.data || error.message);
//         throw error;
//     }
// };
// exports.subscribeWebhook = subscribeWebhook;
// /* -------------------------------------------------------------------------- */
// /*                              Request Proof                                  */
// /* -------------------------------------------------------------------------- */
// const requestProof = async (accessToken) => {
//     try {
//         const proofPayload = {
//             proofName: "Verify Foundational ID",
//             proofAttributes: [
//                 {
//                     name: "ID Type",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//                 {
//                     name: "ID Number",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//                 {
//                     name: "Full Name",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//                 {
//                     name: "Gender",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//                 {
//                     name: "Date of Birth",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//                 {
//                     name: "Citizenship",
//                     restrictions: [
//                         {
//                             schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//                         },
//                     ],
//                 },
//             ],
//         };
//         const response = await axios_1.default.post(`${ndiConfig_1.ndiVerifierConfig.baseUrl}${ndiConfig_1.ndiVerifierConfig.proofRequestPath}`, proofPayload, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//             },
//             httpsAgent,
//         });
//         const { proofRequestURL, proofRequestThreadId, proofRequestName, deepLinkURL, } = response.data.data;
//         /* ---------------------------------------------------------------------- */
//         /*                        TERMINAL QR GENERATION                           */
//         /* ---------------------------------------------------------------------- */
//         // console.log("\n================= NDI PROOF REQUEST =================\n");
//         // console.log(`Proof Name     : ${proofRequestName}`);
//         // console.log(`Thread ID      : ${proofRequestThreadId}\n`);
//         // console.log("Scan this QR Code using Bhutan NDI App:\n");
//         // Render QR directly in terminal
//         const terminalQR = await qrcode_1.default.toString(proofRequestURL, {
//             type: "terminal",
//             small: true,
//         });
//         // console.log(terminalQR);
//         // console.log("Deep Link (Mobile Only):");
//         // console.log(deepLinkURL);
//         // console.log("\n=====================================================\n");
//         return {
//             proofRequestName,
//             proofRequestThreadId,
//             deepLinkURL,
//             proofRequestURL
//         };
//     }
//     catch (error) {
//         // console.error("PROOF REQUEST FAILED:", error.response?.status, error.response?.data || error.message);
//         throw error;
//     }
// };
// exports.requestProof = requestProof;
// /* -------------------------------------------------------------------------- */
// /*                       Master Orchestrator Function                           */
// /* -------------------------------------------------------------------------- */
// const ensureWebhookAndRequestProof = async (accessToken, threadId) => {
//     try {
//         // 1. Check existing webhooks
//         const registeredWebhooks = await (0, exports.fetchRegisteredWebhooks)(accessToken);
//         const exists = isWebhookAlreadyRegistered(registeredWebhooks, ndiConfig_1.ndiWebhookConfig.webhookId, ndiConfig_1.ndiWebhookConfig.webhookURL);
//         // 2. Register if missing
//         if (!exists) {
//             await (0, exports.registerWebhook)(accessToken);
//         }
//         else {
//             // console.log("Webhook already registered. Proceeding...");
//         }
//         // 3. Subscribe webhook
//         const subscription = await (0, exports.subscribeWebhook)(accessToken, threadId);
//         // 4. Request proof
//         const proof = await (0, exports.requestProof)(accessToken);
//         return {
//             subscription,
//             proof,
//         };
//     }
//     catch (error) {
//         // console.error("NDI FLOW FAILED:", error);
//         throw error;
//     }
// };
// exports.ensureWebhookAndRequestProof = ensureWebhookAndRequestProof;
