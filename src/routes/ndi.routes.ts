import { Router } from "express";
import {
  createSession,
  getSessionStatus
} from "../controllers/ndiControllers";
import { getNDIAccessToken } from "../controllers/ndiAuth.controller";
import {
  // registerNdiWebhook,
  startNdiVerification,
  ndiWebhookHandler
} from "../controllers/ndiWebhook.controllers";
// import { getProofResult } from "../controllers/proofResult.controller";
// import { getProofResultByThreadId } from "../controllers/proofResult.controller";



const router = Router();

// Webhook registration & NDI callbacks
// router.post("/register-webhook", registerNdiWebhook);
router.post("/webhook", ndiWebhookHandler); // NDI will call this endpoint

// NDI Auth
router.post("/auth", getNDIAccessToken);

// NDI Verifier flow
router.post("/proof-request", startNdiVerification); //proof-request
// router.get("/proof-result/:threadId", getProofResult);

// Existing session-related endpoints
router.get("/create-session", createSession);
router.get("/session-status/:sessionId", getSessionStatus);

router.post("/webhook", ndiWebhookHandler);
// router.post("/proof-request", startNdiVerification);
// router.get("/proof-result/:threadId", getProofResult);


// src/routes/ndi.routes.ts
// router.get(
//   "/proof-result/:threadId",
//   getProofResultByThreadId
// );


// router.get("/proof-result/:threadId", getProofResult);



export default router;
