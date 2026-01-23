import axios from "axios";
import { ndiVerifierConfig } from "../config/ndiConfig";
import https from "https";
import QRCode from "qrcode";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const proofs = [{
    proofname: "Verify Foundational ID",
    proofAttributes: [
            {
      name: "ID Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    {
      name: "ID Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    {
      name: "Full Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    {
      name: "Gender", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    {
      name: "Date of Birth", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    {
      name: "Citizenship", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    },
    // {
    //   name: "Household Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
    // },
    // {
    //     name:"Blood Type", restrictions: [{schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076"}]
    // }
    { name: "Mobile Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
    { name: "Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
    { name: "Email", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f" }] },
    // { name: "Passport-Size Photo", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8" }] },
    // { name: "E-signature", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3" }] },
    ]  
},
{
    proofname: "Verify Foundational ID",
    proofAttributes: [
    // ==========================
    // Residential Info
    // ==========================
    { name: "House Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
    { name: "Thram Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
    { name: "Village", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
    { name: "Gewog", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
    { name: "Dzongkhag", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
    ]
}, 
{
    proofname: "Verify Foundational ID (Permit Info)",
    proofAttributes: [
  // ==========================
    // Permit Info
    // ==========================
    { name: "Permit Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Job Category", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Employer Name ", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Location Dzongkhag ", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Location Gewog ", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Worksite", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    ]
},  
{
    proofname: "Verify Foundational ID(Student Permit)",
    proofAttributes: [
    // ==========================
    // Student Permit
    // ==========================
    { name: "Permit Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    { name: "Institution ", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
    ]
}, 
{
    proofname: "Verify Foundational ID(Immigration Card)",
    proofAttributes: [
    // ==========================
    // Immigration Card
    // ==========================
    { name: "Card Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
    { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
    { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
    { name: "Spouse CID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
    ]
},  
{
    proofname: "Verify Foundational ID(Dependent Permit)",
    proofAttributes: [
    // ==========================
    // Dependent Permit
    // ==========================
    { name: "Permit Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
    { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
    { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
    { name: "Relationship  ", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
    ]
},  

{
    proofname: "Verify Foundational ID2",
    proofAttributes: [
    ]
},         
]

// src/store/requestedAttributes.store.ts
export const requestedAttributesStore = new Map<string, string[]>();
export const proofResultStore = new Map<string, Record<string, any>>();
export const processedThreadIds = new Set<string>();

const buildProofPayload = (proofName: string) => {
  const matchedProofs = proofs.filter(p => p.proofname === proofName);

  const proofAttributes = matchedProofs.flatMap(
    p => p.proofAttributes
  );

  if (proofAttributes.length === 0) {
    throw new Error("No proofAttributes found for proofName: " + proofName);
  }

  return {
    proofName,
    proofAttributes,
  };
};



export const requestProof = async (accessToken: string) => {
  try {
    const proofPayload = buildProofPayload("Verify Foundational ID");

    console.log("proof Payload:", proofPayload)
    const response = await axios.post(
      `${ndiVerifierConfig.baseUrl}${ndiVerifierConfig.proofRequestPath}`,
      proofPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );

    const {
      proofRequestURL,
      proofRequestThreadId,
      proofRequestName,
      deepLinkURL,
    } = response.data.data;
    
    // console.log("response:",
    //     response.data.data)

    /* ---------------------------------------------------------------------- */
    /*                        TERMINAL QR GENERATION                           */
    /* ---------------------------------------------------------------------- */
    console.log("Payload sent:", proofPayload);

    console.log("\n================= NDI PROOF REQUEST =================\n");
    console.log(`Proof Name     : ${proofRequestName}`);
    console.log(`Thread ID      : ${proofRequestThreadId}\n`);

    console.log("Scan this QR Code using Bhutan NDI App:\n");

    // Render QR directly in terminal
    const terminalQR = await QRCode.toString(proofRequestURL, {
      type: "terminal",
      small: true,
    });
    console.log(terminalQR);

    // console.log("Deep Link (Mobile Only):");
    // console.log(deepLinkURL);
    // console.log("\n=====================================================\n");
const requestedAttributeNames = proofPayload.proofAttributes.map(
  (attr) => attr.name
);

    return {
      proofRequestName,
      proofRequestThreadId,
      deepLinkURL,
      proofRequestURL,
      requestedAttributeNames,
    };
  } catch (error: any) {
    console.error(
      "PROOF REQUEST FAILED:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
};



// {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//   // ==========================
//     // Contact Info
//     // ==========================
//     { name: "Mobile Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     { name: "Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     // { name: "Email", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f" }] },
//     ]
// }, 
// {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//   // ==========================
//     // Contact Info
//     // ==========================
//     // { name: "Mobile Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     // { name: "Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     { name: "Email", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f" }] },
//     ]
// },
// {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//  // ==========================
//     // ID / Signature / Photo
//     // ==========================
//     { name: "Passport-Size Photo", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8" }] },
//     // { name: "E-signature", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3" }] },
//     ]
// },
// {
//     proofname: "Verify Foundational ID",
//     proofAttributes: [
//  // ==========================
//     // ID / Signature / Photo
//     // ==========================
//     // { name: "Passport-Size Photo", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8" }] },
//     { name: "E-signature", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3" }] },
//     ]
// },


// {
//     proofname: "Verify Foundational ID31",
//     proofAttributes: [
//     // Current Address Details
//     // ==========================
//     { name: "Unit", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Building", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Street", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Suburb", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "City", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "State", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Country", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Postal Code", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Landmark", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     ]
// },  
 
// {
//     proofname: "Verify Foundational I1D",
//     proofAttributes: [

//     // ==========================
//     // Employment Info
//     // ==========================
//     { name: "Employment ID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Position", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Grade", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Employment Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Start Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "End Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Employer", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     { name: "Salary", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     ]
// },  
// {
//     proofname: "Verify Foundational ID1",
//     proofAttributes: [
//     // ==========================
//     // Banking Info
//     // ==========================
//     { name: "CIF", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/61179c5f-44f4-4380-ae37-ff3b1f093288" }] },
//     { name: "Bank Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/61179c5f-44f4-4380-ae37-ff3b1f093288" }] },
//     { name: "Account Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Account Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "BFSC", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Opening Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Status", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Mode of Operation", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02_" }]},
//     ]
// },  
// {
//     proofname: "Verify Foundational ID3",
//     proofAttributes: [
// // ==========================
// // Driving / Vehicle Info
// // ==========================
// {
//   name: "License Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fae05482-06ad-4dc5-8e36-b2e4d020964e" }]
// },
// {
//   name: "Learner License No",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Issue Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Valid Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Drive Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Registration No",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Registration Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Vehicle Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Engine Number",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Chasis Number",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Fuel Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// // {
// //   name: "Color",
// //   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// // },
//     ]
// },  


// const proofPayload = {
//   proofName: "Verify Foundational ID",
//   proofAttributes: [
//     // ==========================
//     // Foundational ID / Personal Info
//     // ==========================
//     {
//       name: "ID Type",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "ID Number",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "Full Name",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "Gender",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "Date of Birth",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "Citizenship",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     {
//       name: "Household Number",
//       restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     },
//     // {
//     //   name: "Blood Type",
//     //   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076" }],
//     // },

//     // ==========================
//     // Residential Info
//     // ==========================
//     { name: "House Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//     { name: "Thram Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//     { name: "Village", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//     { name: "Gewog", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },
//     { name: "Dzongkhag", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54" }] },

//     // ==========================
//     // Permit Info
//     // ==========================
//     { name: "Permit Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
//     { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
//     { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },
//     { name: "Institution", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3" }] },

//     // ==========================
//     // Marriage / Family Info
//     // ==========================
//     { name: "Card Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
//     { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
//     { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },
//     { name: "Spouse CID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a" }] },

//     // ==========================
//     // Family Permit Info
//     // ==========================
//     { name: "Permit Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
//     { name: "Expiry Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
//     { name: "Issue Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },
//     { name: "Relationship", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6" }] },

//     // ==========================
//     // Residential Address Details
//     // ==========================
//     { name: "Unit", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Building", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Street", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Suburb", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "City", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "State", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Country", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Postal Code", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },
//     { name: "Landmark", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418" }] },

//     // ==========================
//     // Contact Info
//     // ==========================
//     { name: "Mobile Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     { name: "Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724" }] },
//     { name: "Email", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f" }] },

//     // ==========================
//     // Health Info
//     // ==========================
//     // { name: "Allergy Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/2eade023-db8f-4496-8d30-f0d487e0094c" }] },
//     // { name: "Allergic To", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/2eade023-db8f-4496-8d30-f0d487e0094c" }] },

//     // ==========================
//     // ID / Signature / Photo
//     // ==========================
//     { name: "Passport-Size Photo", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8" }] },
//     { name: "E-signature", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3" }] },

//     // ==========================
//     // NDI / System IDs
//     // ==========================
//     // { name: "id", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617" }] },
//     // { name: "type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617" }] },
//     // { name: "statusPurpose", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617" }] },
//     // { name: "statusListIndex", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617" }] },
//     // { name: "statusListCredential", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617" }] },

//     // ==========================
//     // Employment Info
//     // ==========================
//     // { name: "Employment ID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Position", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Grade", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Employment Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Start Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "End Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Employer", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },
//     // { name: "Salary", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5" }] },

//     // ==========================
//     // Student / Education Info
//     // ==========================
//     // { name: "Student ID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },
//     // { name: "Student Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },
//     // { name: "College Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },
//     // { name: "Programme Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },
//     // { name: "Enrollment Year", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },
//     // { name: "Programme Duration", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/295abb90-559d-401b-a100-8cb7a8ce5d2e" }] },

//     // ==========================
//     // Awards / Certificate
//     // ==========================
//     // { name: "Issuer Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42" }] },
//     // { name: "Student ID", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42" }] },
//     // { name: "Student Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42" }] },
//     // { name: "Title of Award", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42" }] },
//     // { name: "College Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42" }] },

//     // ==========================
//     // Banking Info
//     // ==========================
//     { name: "CIF", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/61179c5f-44f4-4380-ae37-ff3b1f093288" }] },
//     { name: "Bank Name", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/61179c5f-44f4-4380-ae37-ff3b1f093288" }] },
//     { name: "Account Number", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Account Type", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "BFSC", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Opening Date", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Status", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772" }] },
//     { name: "Mode of Operation", restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/1d02_" }]},
// // ==========================
// // Driving / Vehicle Info
// // ==========================
// {
//   name: "License Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/fae05482-06ad-4dc5-8e36-b2e4d020964e" }]
// },
// {
//   name: "Learner License No",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Issue Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Valid Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Drive Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367" }]
// },
// {
//   name: "Registration No",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Registration Date",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Vehicle Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Engine Number",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Chasis Number",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// {
//   name: "Fuel Type",
//   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// },
// // {
// //   name: "Color",
// //   restrictions: [{ schema_name: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96" }]
// // },
// ]
// }