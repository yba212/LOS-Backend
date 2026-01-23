// import axios from "axios"
// import https from "https"
// import { ndiVerifierConfig } from "../config/ndiConfig"
// const verifierUrl = `${ndiVerifierConfig.baseUrl}${ndiVerifierConfig.proofRequestPath}`

// export interface ProofAttribute {
//   name: string
//   restrictions: { schema_name: string }[]
// }

// export interface ProofRequestBody {
//   proofName: string
//   proofAttributes: ProofAttribute[]
// }

// export const createProofRequest = async (
//   accessToken: string
// ): Promise<any> => {
//   try {
//     const httpsAgent = new https.Agent({
//       rejectUnauthorized: false, // only for dev / staging
//     })

//     const proofRequestBody: ProofRequestBody = {
//       proofName: "Verify Foundational ID",
//       proofAttributes: [
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
//       ],
//     }
// console.log("NDI VERIFIER REQUEST BODY:", proofRequestBody) 
// console.log("NDI VERIFIER URL:", verifierUrl)
//     const response = await axios.post(
//       verifierUrl,
//       proofRequestBody,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           Accept: "*/*",
//         },
//         httpsAgent,
//       }
//     )
//     console.log("NDI VERIFIER RESPONSE DATA:", response.data)

//     return response.data
//   } catch (error: any) {
//     console.error("NDI VERIFIER ERROR:", error.response?.data || error.message)
//     throw new Error(error.response?.data || error.message)
//   }
// }
