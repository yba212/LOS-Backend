import { Request, Response } from "express";
import {
  registerWebhook,
  subscribeWebhook,
} from "../webhooks/ndiWebhook.service";
import { requestProof } from "./proofRequest";

/* -------------------------------------------------------------------------- */
/*                 TEMPORARY IN-MEMORY PROOF RESULT STORE                      */
/*                  (DEV ONLY – replace with DB later)                        */
/* -------------------------------------------------------------------------- */
const proofResultStore = new Map<string, any>();
const requestedAttributesStore = new Map<string, string[]>();
const processedThreadIds = new Set<string>();

/* -------------------------------------------------------------------------- */
/*                     EXTRACT USER DATA DYNAMICALLY                           */
/* -------------------------------------------------------------------------- */
const extractUserData = (payload: any, requestedAttributes: string[]) => {
  const revealed =
    payload?.requested_presentation?.revealed_attrs || {};

  const selfAttested =
    payload?.requested_presentation?.self_attested_attrs || {};

  const userData: Record<string, string> = {};

  for (const attrName of requestedAttributes) {
    // 1️⃣ Check revealed attributes first
    if (Array.isArray(revealed[attrName]) && revealed[attrName][0]?.value !== undefined) {
      userData[attrName] = revealed[attrName][0].value;
      continue;
    }

    // 2️⃣ Then check self-attested attributes
    if (Array.isArray(selfAttested[attrName]) && selfAttested[attrName][0]?.value !== undefined) {
      userData[attrName] = selfAttested[attrName][0].value;
    }
  }

  return Object.keys(userData).length ? userData : null;
};


/* -------------------------------------------------------------------------- */
/*                         HANDLE PROOF RESULT                                 */
/* -------------------------------------------------------------------------- */
export const handleProofResult = (payload: any) => {
  const threadId = payload?.thid;
  if (!threadId) return;
  proofResultStore.set(threadId, payload);

  // Avoid duplicate processing
  if (processedThreadIds.has(threadId)) return;
  if (payload?.verification_result !== "ProofValidated") return false;

  // Use stored requested attributes OR fallback to revealed_attrs
  const requestedAttrs =
    requestedAttributesStore.get(threadId) ||
    Object.keys(payload.requested_presentation?.revealed_attrs || {});

  if (!requestedAttrs.length) {
    console.warn("⚠️ No requested attributes found for thread:", threadId);
    return false;
  }
console.log("Stored proof for thread:", threadId);

  const userData = extractUserData(payload, requestedAttrs);
  if (!userData) return;

  // Store processed thread and user data
  processedThreadIds.add(threadId);
  proofResultStore.set(threadId, {
    threadId,
    attributes: userData,
    receivedAt: new Date().toISOString(),
  });

  console.log("thid in proofstore:", proofResultStore)
    // userData);

  // Log full response
  console.log("\n=========== USER PROOF RESULT RECEIVED ===========\n");
  console.log("Thread ID:", threadId);
  console.log("Payload received from NDI app:", JSON.stringify(payload, null, 2));
  console.log("\n===================================================\n");

  // Log final user data ONCE
  console.log("\n=========== FINAL USER DATA RECEIVED ===========\n");
  console.log("Thread ID:", threadId);
  console.table(userData);
  console.log("\n================================================\n");
  return true;
};


/* -------------------------------------------------------------------------- */
/*                         NDI WEBHOOK HANDLER                                  */
/* -------------------------------------------------------------------------- */
export const ndiWebhookHandler = async (req: Request, res: Response) => {
  const threadId = req.body?.thid;

  if (!threadId) {
    console.warn("⚠️ Webhook received without threadId");
    return res.status(400).json({ message: "threadId missing" });
  }

  // 1️⃣ Ignore duplicates immediately
   // If already processed successfully, just ACK silently
  if (processedThreadIds.has(threadId)) {
    return res.status(200).json({ message: "Webhook already processed" });
  }

  console.log("From NDI Webhook Handler:");
  try {
    console.log("\n=========== NDI WEBHOOK HIT ===========\n");
    console.log("Thread ID:", threadId);

    // Call dedicated handler
    const ResponseRes =  handleProofResult(req.body);
    console.log("HandleProofResult Response:",
      ResponseRes)

    console.log("\n=====================================\n");

    // Always ACK NDI
    return res.status(200).json({
     message: "Webhook received", 
    ResponseRes
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return res.status(500).json({ message: "Webhook error" });
  }
};

// proofService.ts
// import { proofResultStore } from "../controllers/proofRequest";

export function getProofByThreadId(threadId: string) {
  const proof = proofResultStore.get(threadId);
  console.log("ProofResult store at get Proof func:", proofResultStore)

  if (!proof) {
    return {
      status: "PENDING",
      message: "Proof not received yet",
    };
  }

  return {
    status: "COMPLETED",
    attributes: proof,
  };
}

/* -------------------------------------------------------------------------- */
/*                    START NDI VERIFICATION FLOW                               */
/* -------------------------------------------------------------------------- */
export const startNdiVerification = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token required in Authorization header",
    });
  }

  try {
    // 1️⃣ Register webhook
    const result = await registerWebhook(accessToken);
    console.log("✅ Webhook registered:", result ?? "Already exists");

    // 2️⃣ Request proof (only once!)
    const proofData = await requestProof(accessToken);
    console.log("✅ Proof requested Response:", proofData);

    // Store requested attributes for this proof thread immediately
    requestedAttributesStore.set(
      proofData.proofRequestThreadId,
      proofData.requestedAttributeNames
    );

    // 3️⃣ Subscribe webhook to proof thread
    const subscriptionRes = await subscribeWebhook(
      accessToken,
      proofData.proofRequestThreadId
    );
    console.log("✅ Webhook subscribed to proof thread:", subscriptionRes);

    // 4️⃣ Respond immediately
    return res.status(201).json({
      message: "NDI verification started",
      data: {
        proofRequestURL: proofData.proofRequestURL,
        threadId: proofData.proofRequestThreadId,
        deepLinkURL: proofData.deepLinkURL,
      },
    });
  } catch (error: any) {
    console.error("NDI verification failed:", error);

    return res.status(500).json({
      message: "NDI verification failed",
      error: error.message,
    });
  }
};



/* -------------------------------------------------------------------------- */
/*              OPTIONAL: FETCH PROOF RESULT (POLLING)                         */
/* -------------------------------------------------------------------------- */
// export const getProofResult = async (req: Request, res: Response) => {
//   const { threadId } = req.params;

//   if (!threadId) {
//     return res.status(400).json({ message: "threadId required" });
//   }

//   const result = proofResultStore.get(threadId);

//   if (!result) {
//     return res.status(202).json({
//       message: "Proof result not available yet",
//     });
//   }

//   return res.status(200).json({
//     message: "Proof result received",
//     data: result,
//   });
// };

