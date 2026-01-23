import { proofResultStore } from "./proofRequest";

export const getProofResultByThreadId = (threadId: string) => {
  const proof = proofResultStore.get(threadId);

  if (!proof) {
    return {
      statusCode: 202,
      body: {
        status: "PENDING",
        message: "Proof not received yet",
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      status: "COMPLETED",
      attributes: proof.attributes,
      receivedAt: proof.receivedAt,
    },
  };
};





// import axios from "axios";
// import https from "https";
// import QRCode from "qrcode";
// import { ndiVerifierConfig } from "../config/ndiConfig";


// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// /* =========================================================================
//    PROOF DEFINITIONS
//    ========================================================================= */

// const proofs = [
//   {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//       { name: "ID Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "ID Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "Full Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "Gender", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "Date of Birth", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "Citizenship", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }] },
//       { name: "Mobile Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//       { name: "Email", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f" }] },
//       { name: "Passport-Size Photo", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8" }] },
//       { name: "E-signature", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3" }] },
//     ],
//   },
//   {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//       { name: "House Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//       { name: "Thram Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//       { name: "Village", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//       { name: "Gewog", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//       { name: "Dzongkhag", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//     ],
//   },
// ];

// /* =========================================================================
//    BUILD PROOF PAYLOAD
//    ========================================================================= */

// const buildProofPayload = (proofName: string) => {
//   const matchedProofs = proofs.filter(p => p.proofname === proofName);

//   const proofAttributes = matchedProofs.flatMap(p => p.proofAttributes);

//   if (!proofAttributes.length) {
//     throw new Error(`No proofAttributes found for proofName: ${proofName}`);
//   }

//   return {
//     proofName,
//     proofAttributes,
//   };
// };

// /* =========================================================================
//    REQUEST PROOF (MAIN FUNCTION)
//    ========================================================================= */

// export const requestProof = async (accessToken: string) => {
//   try {
//     const proofPayload = buildProofPayload("Verify Foundational ID");

//     const response = await axios.post(
//       `${ndiVerifierConfig.baseUrl}${ndiVerifierConfig.proofRequestPath}`,
//       proofPayload,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         httpsAgent,
//       }
//     );

//     const {
//       proofRequestURL,
//       threadId,
//       proofRequestName,
//       deepLinkURL,
//     } = response.data.data;

//     /* --------------------------------------------------
//        STORE REQUESTED ATTRIBUTES BY THREAD ID
//     -------------------------------------------------- */

//     const requestedAttributeNames = proofPayload.proofAttributes.map(
//       attr => attr.name
//     );

//     requestedAttributesStore.set(threadId, requestedAttributeNames);

//     /* --------------------------------------------------
//        OPTIONAL: TERMINAL QR (FOR BACKEND TESTING ONLY)
//     -------------------------------------------------- */

//     if (process.env.NODE_ENV !== "production") {
//       const terminalQR = await QRCode.toString(proofRequestURL, {
//         type: "terminal",
//         small: true,
//       });

//       console.log("\n=========== NDI PROOF REQUEST ===========\n");
//       console.log("Proof Name:", proofRequestName);
//       console.log("Thread ID :", threadId);
//       console.log("\nScan this QR:\n");
//       console.log(terminalQR);
//     }

//     /* --------------------------------------------------
//        RETURN TO FRONTEND
//     -------------------------------------------------- */

//     return {
//       success: true,
//       data: {
//         proofRequestName,
//         threadId,
//         proofRequestURL,
//         deepLinkURL,
//         requestedAttributeNames,
//       },
//     };

//   } catch (error: any) {
//     console.error(
//       "PROOF REQUEST FAILED:",
//       error.response?.status,
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// };
