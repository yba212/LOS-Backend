// import axios from "axios";
// import { ndiVerifierConfig } from "../config/ndiConfig";
// import {  IssuerType, CredentialType } from
//   "../config/ndiProofRegistry";
// import { NDI_PROOF_REGISTRY } from "../config/ndiProofs.config";
// import https from "https";


// export const requestNDIProof = async (
//   issuer: IssuerType,
//   credential: CredentialType,
//   accessToken: string
// ) => {
//   const issuerConfig = NDI_PROOF_REGISTRY[issuer];
//   if (!issuerConfig) {
//     throw new Error(`Unsupported issuer: ${issuer}`);
//   }

//   const proofConfig = issuerConfig[credential];
//   if (!proofConfig) {
//     throw new Error(
//       `Credential ${credential} not supported for issuer ${issuer}`
//     );
//   }

//   const proofPayload = {
//     proofName: proofConfig.proofName,
//     proofAttributes: proofConfig.attributes.map((attr) => ({
//       name: attr.name,
//       restrictions: [
//         {
//           schema_name: proofConfig.schemaUrl,
//         },
//       ],
//     })),
//   };

//   const response = await axios.post(
//     `${ndiVerifierConfig.baseUrl}${ndiVerifierConfig.proofRequestPath}`,
//     proofPayload,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     //   httpsAgent,
//     }
//   );

//   return {
//     proofRequestName: response.data.data.proofRequestName,
//     proofRequestThreadId: response.data.data.proofRequestThreadId,
//     proofRequestURL: response.data.data.proofRequestURL,
//     deepLinkURL: response.data.data.deepLinkURL,
//     requestedAttributeNames: proofConfig.attributes.map(
//       (a) => a.name
//     ),
//   };
// };
