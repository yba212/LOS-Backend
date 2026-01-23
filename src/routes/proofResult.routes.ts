// import { Router } from "express";
// import { proofResultStore } from "../controllers/proofRequest";

// const router = Router();

// router.get("/:threadId", (req, res) => {
//   const  threadId  = req.params.threadId;
//   console.log("request params:", req.params)
//   console.log("thread:", threadId)

//   // Map access must use .get()
//   const proof = proofResultStore.get(threadId);
// console.log("Proof:",proof)
//   if (!proof) {
//     return res.status(202).json({
//       status: "PENDING",
//       message: "Proof not received yet",
//     });
//   }

//   return res.json({
//     status: "COMPLETED",
//     // attributes: proof,
//   });
// });

// export default router;
// proofResultRoutes.ts
import { Router, Request, Response } from "express";
import { getProofByThreadId } from "../controllers/ndiWebhook.controllers";

const router = Router();

router.get("/:threadId", (req, res) => {
  const { threadId } = req.params;

  const proofResponse = getProofByThreadId(threadId);

  console.log("Thread ID:", threadId);
  console.log("Proof response:", proofResponse);

  if (proofResponse.status === "PENDING") {
    return res.status(202).json(proofResponse);
  }

  return res.json({
    status: "COMPLETED",
    attributes: proofResponse.attributes.attributes,
    receivedAt: proofResponse.attributes.receivedAt,
  });
});


export default router;
