"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ndiNatsConfig = exports.ndiWebhookConfig = exports.ndiVerifierConfig = exports.ndiAuthConfig = void 0;
exports.ndiAuthConfig = {
    authUrl: "https://staging.bhutanndi.com/authentication/v1/authenticate",
    clientId: "3tq7ho23g5risndd90a76jre5f",
    clientSecret: "111rvn964mucumr6c3qq3n2poilvq5v92bkjh58p121nmoverquh",
};
// console.log("NDI CONFIG CHECK:", ndiConfig)
exports.ndiVerifierConfig = {
    baseUrl: "https://demo-client.bhutanndi.com/verifier",
    proofRequestPath: "/v1/proof-request",
    // Add more verifier endpoints here if needed
};
/* =======================
   NDI WEBHOOK CONFIG
======================= */
exports.ndiWebhookConfig = {
    baseURL: "https://demo-client.bhutanndi.com",
    registerPath: "/webhook/v1/register",
    subscribePath: "/webhook/v1/subscribe",
    // This must be UNIQUE per verifier
    webhookId: "BIL_NDI_LOS_WEBHOOK",
    // Your backend endpoint (ngrok / prod URL)
    webhookURL: "https://mitered-propitiatingly-jana.ngrok-free.dev/ndi/webhook",
    // Fixed token used by NDI to authenticate webhook calls
    fixedAccessToken: "FIXED_WEBHOOK_TOKEN_123",
};
// NATS Config
exports.ndiNatsConfig = {
    // url: "https://natsdemoclient.bhutanndi.com",            // NATS URL
    url: "wss://natsdemoclient.bhutanndi.com", // NATS WebSocket URL
    seed: "SUAPXY7TJFUFE3IX3OEMSLE3JFZJ3FZZRSRSOGSG2ANDIFN77O2MIBHWUM", // Seed for NKey auth
    pattern: "threadId",
};
