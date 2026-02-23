import axios from "axios";
import https from "https";
import QRCode from "qrcode";
import { ndiVerifierConfig, ndiWebhookConfig } from "../config/ndiConfig";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

/* -------------------------------------------------------------------------- */
/*                               Helper Methods                               */
/* -------------------------------------------------------------------------- */

// const isWebhookAlreadyRegistered = (
//   webhooks: any[],
//   webhookId: string,
//   webhookURL: string
// ): boolean => {
//   return webhooks.some(
//     (wh) =>
//       wh.webhookId === webhookId ||
//       wh.webhookURL === webhookURL
//   );
// };

/* -------------------------------------------------------------------------- */
/*                         Fetch Registered Webhooks                           */
/* -------------------------------------------------------------------------- */

// export const fetchRegisteredWebhooks = async (accessToken: string) => {
//   try {
//     const response = await axios.get(
//       `${ndiWebhookConfig.baseURL}/webhook/v1/list`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         httpsAgent,
//       }
//     );

//     return response.data?.data || [];
//   } catch (error: any) {
//     console.error(
//       "FAILED TO FETCH WEBHOOK LIST:",
//       error.response?.status,
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

/* -------------------------------------------------------------------------- */
/*                             Register Webhook                                */
/* -------------------------------------------------------------------------- */

export const registerWebhook = async (accessToken: string) => {
  const payload = {
    webhookId: ndiWebhookConfig.webhookId,
    webhookURL: ndiWebhookConfig.webhookURL,
    authentication: {
      type: "OAuth2",
      version: "v2",
      data: {
        token: ndiWebhookConfig.fixedAccessToken,
      },
    },
  };

  try {
    // console.log("Registering NDI Webhook:", payload);

    const response = await axios.post(
      `${ndiWebhookConfig.baseURL}${ndiWebhookConfig.registerPath}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        httpsAgent,
      }
    );

    // console.log("Webhook registered successfully");
    return response.data;
  } catch (error: any) {
    // console.log("Registration RESPONSE:", error.response.data);

    if (error.response?.status === 409) {
      // console.log("Webhook already exists. Skipping registration.");
      
      return;
    }

    // console.error(
    //   "NDI WEBHOOK REGISTER FAILED:",
    //   error.response?.status,
    //   error.response?.data || error.message
    // );
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                             Subscribe Webhook                               */
/* -------------------------------------------------------------------------- */

export const subscribeWebhook = async (
  accessToken: string,
  threadId: string
) => {
  const payload = {
    webhookId: ndiWebhookConfig.webhookId,
    threadId,
  };

  try {
    // console.log("Subscribing to NDI Webhook:", payload);

    const response = await axios.post(
      `${ndiWebhookConfig.baseURL}/webhook/v1/subscribe`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        httpsAgent,
      }
    );

    // console.log("Webhook subscription successful");
    return response.data;
  } catch (error: any) {
    // console.error(
    //   "NDI WEBHOOK SUBSCRIBE FAILED:",
    //   error.response?.status,
    //   error.response?.data || error.message
    // );
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              Request Proof                                  */
/* -------------------------------------------------------------------------- */

// export const requestProof = async (accessToken: string) => {
//   try {
//     const proofPayload = {
//       proofName: "Verify Foundational ID",
//       proofAttributes: [
//         {
//           name: "ID Type",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//         {
//           name: "ID Number",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//         {
//           name: "Full Name",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//         {
//           name: "Gender",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//                 {
//           name: "Date of Birth",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//         {
//           name: "Citizenship",
//           restrictions: [
//             {
//               schema_name:
//                 "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
//             },
//           ],
//         },
//       ],
//     };

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
//       proofRequestThreadId,
//       proofRequestName,
//       deepLinkURL,
//     } = response.data.data;

//     /* ---------------------------------------------------------------------- */
//     /*                        TERMINAL QR GENERATION                           */
//     /* ---------------------------------------------------------------------- */
//     console.log("Payload sent:", proofPayload);

//     console.log("\n================= NDI PROOF REQUEST =================\n");
//     console.log(`Proof Name     : ${proofRequestName}`);
//     console.log(`Thread ID      : ${proofRequestThreadId}\n`);

//     console.log("Scan this QR Code using Bhutan NDI App:\n");

//     // Render QR directly in terminal
//     const terminalQR = await QRCode.toString(proofRequestURL, {
//       type: "terminal",
//       small: true,
//     });
//     console.log(terminalQR);

//     // console.log("Deep Link (Mobile Only):");
//     // console.log(deepLinkURL);
//     // console.log("\n=====================================================\n");
// const requestedAttributeNames = proofPayload.proofAttributes.map(
//   (attr) => attr.name
// );

//     return {
//       proofRequestName,
//       proofRequestThreadId,
//       deepLinkURL,
//       proofRequestURL,
//       requestedAttributeNames,
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



/* -------------------------------------------------------------------------- */
/*                       Master Orchestrator Function                           */
/* -------------------------------------------------------------------------- */

// export const ensureWebhookAndRequestProof = async (
//   accessToken: string,
//   threadId: string
// ) => {
//   try {
//     // 1. Check existing webhooks
//     const registeredWebhooks = await fetchRegisteredWebhooks(accessToken);

//     const exists = isWebhookAlreadyRegistered(
//       registeredWebhooks,
//       ndiWebhookConfig.webhookId,
//       ndiWebhookConfig.webhookURL
//     );

//     // 2. Register if missing
//     if (!exists) {
//       await registerWebhook(accessToken);
//     } else {
//       console.log("Webhook already registered. Proceeding...");
//     }

//     // 3. Subscribe webhook
//     const subscription = await subscribeWebhook(accessToken, threadId);

//     // 4. Request proof
//     const proof = await requestProof(accessToken);

//     return {
//       subscription,
//       proof,
//     };
//   } catch (error) {
//     console.error("NDI FLOW FAILED:", error);
//     throw error;
//   }
// };
