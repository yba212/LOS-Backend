import { CredentialType, IssuerType } from "./ndiProofRegistry";

export interface ProofAttribute {
  name: string;
}

export interface CredentialProofConfig {
  proofName: string;
  schemaUrl: string;
  attributes: ProofAttribute[];
}

export interface ProofConfig {
  proofName: string;
  schemaUrl: string;
  attributes: ProofAttribute[];
}

export type IssuerRegistry = Partial<
  Record<CredentialType, ProofConfig>
>;

export const NDI_PROOF_REGISTRY: Record<
  IssuerType,
  IssuerRegistry
> = {
    FOUNDATIONAL: {
        FOUNDATIONAL_ID: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
            attributes: [
                { name: "ID Type" },
                { name: "ID Number" },
                { name: "Full Name" },
                { name: "Gender" },
                { name: "Date of Birth" },
                { name: "Citizenship" },
            ],
        },
        PERMANENT_ADDRESS: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/e3b606d0-e477-4fc2-b5ab-0adc4bd75c54",
            attributes: [
                { name: "House Number" },
                { name: "Thram Number" },
                { name: "Village" },
                { name: "Gewog" },
                { name: "Dzongkhag" },
            ],
        },

        WORK_PERMIT: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/dbdd750c-72bf-4635-b541-44df92553316",
            attributes: [
                { name: "Permit Number" },
                { name: "Expiry Date" },
                { name: "Issue Date" },
                { name: "Job Category" },
                { name: "Employer Name" },
                { name: "Location Dzongkhag " },
                { name: "Location Gewog " },
                { name: "Worksite" },
            ],
        },

        STUDENT_PERMIT: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/aa292394-13f4-44c7-94e9-b4c8f0d633c3",
            attributes: [
                { name: "Permit Number" },
                { name: "Expiry Date" },
                { name: "Issue Date" },
                { name: "Institution" },
            ],
        },

        IMMIGRATION_CARD: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/b6f5b945-81f8-47d3-84d4-eb8db3d9414a",
            attributes: [
                { name: "Card Number" },
                { name: "Expiry Date" },
                { name: "Issue Date" },
                { name: "Spouse CID" },
            ],
        },
        DEPENDENT_PERMIT: {
            proofName: "Verify Foundational ID",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/cbf31183-73d3-4a49-b24e-d61b7d6ad4e6",
            attributes: [
                { name: "Permit Number" },
                { name: "Expiry Date" },
                { name: "Issue Date" },
                { name: "Relationship" },
            ],
        },
    },

    SELF_ATTESTED: {
        CURRENT_ADDRESS: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c4f4e15f-caf2-45be-8848-c9694db78418",
            attributes: [
                { name: "Unit" },
                { name: "Street" },
                { name: "Suburb" },
                { name: "City" },
                { name: "State" },
                { name: "Country" },
                { name: "Postal Code" },
                { name: "Landmark" },
            ],
        },

        MOBILE_NUMBER: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/a2dcb671-3d64-47ec-ba59-97a3e642c724",
            attributes: [
                { name: "Mobile Number" },
                { name: "Type" },
            ],
        },

        EMAIL: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/50add817-e7f1-4651-bd62-5471b2f5918f",
            attributes: [
                { name: "Email" },
            ],
        },

        ALLERGY: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/2eade023-db8f-4496-8d30-f0d487e0094c",
            attributes: [
                { name: "Allergy Type" },
                { name: "Allergic To" },
            ],
        },

        PASSPORT_SIZE_PHOTO: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/4dd5f5ad-dc94-4853-8a18-fe09696ebdf8",
            attributes: [
                { name: "Passport-Size Photo" },
            ],
        },

        E_SIGNATURE: {
            proofName: "Verify Self-Attested Address",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/4a2554a5-e347-49e9-81b4-932d25c1aca3",
            attributes: [
                { name: "E-signature" },
            ],
        },
    },

    RSP: {
        REVOCATION_CREDENTIAL: {
            proofName: "Verify RSP Employment",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/fa17a7d4-5dd7-4ee0-b9c0-4f118185b617",
            attributes: [
                { name: "id" },
                { name: "type" },
                { name: "statusPurpose" },
                { name: "statusListIndex" },
                { name: "statusListCredential" },
            ],
        },
    },

    DHI: {
        EMPLOYMENT_RECORD: {
            proofName: "Verify DHI Employment",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/082ac45e-853e-4667-8aa1-7982feb004c5",
            attributes: [
                { name: "Employment ID" },
                { name: "Position" },
                { name: "Grade" },
                { name: "Employment Type" },
                { name: "Start Date" },
                { name: "End Date" },
                { name: "Employer" },
                { name: "Salary" },
            ],
        },
    },

    RUB: {
        STUDENT_ID: {
            proofName: "Verify RUB Student Status",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42",
            attributes: [
                { name: "Student ID" },
                { name: "Student Name" },
                { name: "College Name" },
                { name: "Programme Name" },
                { name: "Enrollment Year" },
                { name: "Programme Duration" },
            ],
        },

        ACADEMIC_CERTIFICATE: {
            proofName: "Verify RUB Student Status",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/ff021513-94b1-407d-a0ee-bb829531df42",
            attributes: [
                { name: "Issuer Name" },
                { name: "Student ID" },
                { name: "Student Name" },
                { name: "Title of Award" },
                { name: "College Name" },
            ],
        },
    },

    BOB: {
        FINANCE_AND_BANK: {
            proofName: "Verify BOB Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/61179c5f-44f4-4380-ae37-ff3b1f093288",
            attributes: [
                { name: "CIF" },
                { name: "Bank Name" },
            ],
        },

        BANK_ACCOUNT: {
            proofName: "Verify BOB Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/1d02c6d1-93d0-400a-bae7-2b37191e3772",
            attributes: [
                { name: "Account Number" },
                { name: "Account Type" },
                { name: "BFSC" },
                { name: "Opening Date" },
                { name: "Status" },
                { name: "Mode of Operation" },
                { name: "Currency" },
            ],
        },
    },

    BDBL: {
        FINANCE_AND_BANK: {
            proofName: "Verify BDBL Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/e58a8a50-e799-4617-a7b0-adce8dfb389b",
            attributes: [
                { name: "CIF" },
                { name: "Bank Name" },
            ],
        },

        BANK_ACCOUNT: {
            proofName: "Verify BDBL Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/355e4859-d02f-4a49-b0b4-e5eb815d5cb7",
            attributes: [
                { name: "Account Type" },
                { name: "Account Number" },
                { name: "Mode of Operation" },
                { name: "Opening Date" },
                { name: "Status" },
            ],
        },
    },

    TASHICELL: {
        MOBILE_NUMBER: {
            proofName: "Verify TASHICELL Contact Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/d6b55148-efa5-4a05-9390-a7ea2b446d99",
            attributes: [
                { name: "Mobile Number" },
                { name: "Type" },
            ],
        },
    },
    BHUTAN_TELECOM: {
        MOBILE_NUMBER: {
        proofName: "Verify BT Contact Details",
        schemaUrl:
            "https://dev-schema.ngotag.com/schemas/e04137bb-0e00-469c-907c-dbe4e43418bd",
        attributes: [
            { name: "Mobile Number" },
            { name: "Type" },
        ],
        },
    },
    RSEB: {
        MOBILE_NUMBER: {
            proofName: "Verify TASHICELL Contact Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/e04137bb-0e00-469c-907c-dbe4e43418bd",
            attributes: [
                { name: "Username" },
                { name: "Type" },
            ],
        },
    },

    DHP: {
        MOBILE_NUMBER: {
            proofName: "Verify DHP Credential Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/3c411fc8-c409-4d47-8369-68a12db691a3",
            attributes: [
                { name: "DHP ID" },
            ],
        },
    },

    G2C: {
        ENVIRONMENTAL_CLEARANCE: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/33f8b16a-303e-4e49-b3b2-2b5256336029",
            attributes: [
                { name: "EC Reference Number" },
                { name: "EC Approve Date" },
                { name: "EC Expiry Date" },
                { name: "EC Status" },
                { name: "Applicant Name" },
                { name: "Project Name" },
                { name: "Address" },
                { name: "Location Name" },
                { name: "Total Area Acre" },
            ],
        },
        AUDIT_CLEARANCE: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c29f1294-57c5-449e-acd5-26cff63cbe76",
            attributes: [
                { name: "Application No" },
                { name: "Application Date" },
                { name: "Purpose" },
                { name: "Expiry Date" },
            ],
        },

        SECURITY_CLEARANCE: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/75bec2a2-ad72-49c6-9939-954b8b9fa723",
            attributes: [
                { name: "Application ID" },
                { name: "Application Date" },
                { name: "Purpose" },
                { name: "Approved Date" },
                { name: "Expiry Date" },
            ],
        },

        CLEARANCE_CERTIFICATE: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/60eef8e1-f8c1-4c75-8019-a2ee2974b200",
            attributes: [
                { name: "Application ID" },
                { name: "Application Date" },
                { name: "Purpose" },
                { name: "Approved Date" },
                { name: "Expiry Date" },
            ],
        },

        INSTITUTE_PROPOSAL_CLEARANCE: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/e40e2663-2a7c-4b40-afbd-e22bed88675b",
            attributes: [
                { name: "Service Name" },
                { name: "Application No" },
                { name: "Issue Date" },
                { name: "Establishment Name" },
                { name: "Establishment Location" },
                { name: "Expiry Status" },
            ],
        },
        ESAKOR_URBAN: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c71774ef-ecb8-40aa-aa88-dc5cc127940e",
            attributes: [
                { name: "Plot ID" },
                { name: "Net Area" },
                { name: "Kasho Area" },
                { name: "Kasho Date" },
                { name: "Plot Name" },
                { name: "Precinct" },
                { name: "Plot Category" },
                { name: "Lap" },
                { name: "Has Structure" },
                { name: "Mortgage Status" },
            ],
        },

        ESAKOR_RURAL: {
            proofName: "Verify G2C Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/ba7af3c8-97d2-489d-a952-d6ebd791d6b0",
            attributes: [
                { name: "Plot ID" },
                { name: "Net Area" },
                { name: "Kasho Area" },
                { name: "Kasho Date" },
                { name: "Plot Name" },
                { name: "Precinct" },
                { name: "Plot Category" },
                { name: "Lap" },
                { name: "Has Structure" },
                { name: "Mortgage Status" },
            ],
        },
    },

    MoICE: {
        TOUR_GUIDE: {
            proofName: "Verify MoICE Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/f9033b85-3eef-41a6-abb0-902870b79ce7",
            attributes: [
                { name: "License Number" },
                { name: "License Type" },
                { name: "Issued Date" },
                { name: "Expiry Date" },
                { name: "License Status" },
            ],
        },

        TOUR_TREKKING_COOK: {
            proofName: "Verify MoICE Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/23b25b99-fc88-4e8c-a5ed-866f4a78be63",
            attributes: [
                { name: "License Number" },
                { name: "License Type" },
                { name: "Issued Date" },
                { name: "Expiry Date" },
                { name: "License Status" },
            ],
        },
    },

    DRATSHANG_LHENTSHOG: {
        DRATSANG_LENTSHOG: {
            proofName: "Verify Dratshang Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/3f3935de-60f1-4a60-b576-286e439388f6",
            attributes: [
                { name: "Monk ID" },
                { name: "Position Title" },
                { name: "Institute" },
                { name: "Qualification" },
                { name: "Status" },
            ],
        },
    },
    // BHUTAN_TELECOM: {
    //     DRATSANG_LENTSHOG: {
    //         proofName: "Verify Dratshang Details",
    //         schemaUrl: "https://dev-schema.ngotag.com/schemas/3f3935de-60f1-4a60-b576-286e439388f6",
    //         attributes: [
    //             { name: "Monk ID" },
    //             { name: "Position Title" },
    //             { name: "Institute" },
    //             { name: "Qualification" },
    //             { name: "Status" },
    //         ],
    //     },
    // },
    RSTA: {
        DRIVING_LICENSE: {
            proofName: "Verify RSTA Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/3f3935de-60f1-4a60-b576-286e439388f6",
            attributes: [
                { name: "Blood Group" },
                { name: "License No" },
                { name: "Issued" },
                { name: "Validity" },
                { name: "Offences" },
                { name: "Drive Type" },
                { name: "License Type" },
            ],
        },
        LEARNER_LICENSE: {
            proofName: "Verify RSTA Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/ed2db83d-a875-486e-ab15-a66972b10367",
            attributes: [
                { name: "Learner License No" },
                { name: "Issue Date" },
                { name: "Valid Date" },
                { name: "Drive Type" },
            ],
        },
        VEHICLE_OWNERSHIP: {
            proofName: "Verify RSTA Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/998cd9a3-80e6-44a7-9dae-3c38209efa96",
            attributes: [
                { name: "Registration No" },
                { name: "Registration Date" },
                { name: "Vehicle Type" },
                { name: "Purchase Type" },
                { name: "Purchase Date" },
                { name: "Price" },
                { name: "Engine Type" },
                { name: "Engine Number" },
                { name: "Chasis Number" },
                { name: "Color" },
                { name: "Dealer" },
                { name: "Manufacturer Year" },
                { name: "Manufacturer Country" },
                { name: "Company" },
                { name: "Model Name" },
                { name: "Model Variant" },
                { name: "Fuel Type" },
                { name: "Transmission Type" },
                { name: "Engine CC" },
                { name: "Kilo Watt Hour" },
                { name: "Horse Power" },
                { name: "Seating Capacity" },
                { name: "Unlade Weight" },
                { name: "Gross Vehicle Weight" },
                { name: "Loading Capacity" },
            ],
        },
    },
    RCSC: {
        EMPLOYEE_ID: {
            proofName: "Verify RCSC Employment Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/2f528ccc-d42f-4760-9758-625580ec2bf8",
            attributes: [
                { name: "EID" },
                { name: "Date of Birth" },
                { name: "Date of Appointment" },
            ],
        },
        EMPLOYEE_DETAILS: {
            proofName: "Verify RCSC Employment Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/fad88b6c-ceee-4b39-ae45-71a34c16078c",
            attributes: [
                { name: "Position Title" },
                { name: "Working Agency" },
                { name: "Super Structure" },
                { name: "Employee Type" },
                { name: "Superannuation Date" },
            ],
        },
    },
    "E_SIGNATURE(SELISE)": {
        SIGNATURE_CONTRACT: {
            proofName: "Verify e-Signature Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/4f1e4498-f4c3-4622-bd62-524008e51574",
            attributes: [
                { name: "Document ID" },
                { name: "Document Link" },
                { name: "Document Hash" },
            ],
        },
    },
    MOBILE_VERIFIER: {
        MOBILE_VERIFIER: {
            proofName: "Verify Mobile Verifier Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/32ef824e-7adb-4563-9293-95a78e5df0ad",
            attributes: [
                { name: "User Name" },
                { name: "Role" },
                { name: "Role ID" },
                { name: "Organization Name" },
                { name: "Organization Id" },
            ],
        },
    },
    TTPL: {
        EMPLOYEE_ID: {
            proofName: "Verify TTPL Employment Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/cdf37142-fa6a-47b0-9ab8-e7f6265cc0e5",
            attributes: [
                { name: "Employee ID" },
                { name: "Appointment Date" },
                { name: "Employer" },
            ],
        },
        EMPLOYEE_DETAILS: {
            proofName: "Verify TTPL Employment Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/363e0cd6-f776-44ea-b216-1c1f3ebc6e6a",
            attributes: [
                { name: "Job Title" },
                { name: "Position Grade" },
                { name: "Position Level" },
                { name: "Employee Type" },
                { name: "Department" },
                { name: "Place of Posting" },
                { name: "Retirement Date" },
            ],
        },
        SALARY_DETAIL: {
            proofName: "Verify TTPL Employment Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c98a0ab9-eafd-4136-ac2d-57b4e79b45b4",
            attributes: [
                { name: "Gross Salary" },
                { name: "Basic Salary" },
                { name: "Net Salary" },
            ],
        },
    },
    eVOTING: {
        VOTER_CARD: {
            proofName: "Verify Voter Card Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/fe62fe63-4930-4c13-92e3-6e9d967eb8e0",
            attributes: [
                { name: "VID" },
                { name: "Demkhong" },
                { name: "Issue Date" },
            ],
        },
        VOTE_DETAIL: {
            proofName: "Verify Voter Card Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/bf7dbb21-1f91-40af-a635-bda0c975ebc6",
            attributes: [
                { name: "Election ID" },
                { name: "Election Name" },
                { name: "Voted" },
                { name: "Voted Date" },
                { name: "Transaction" },
            ],
        },
    },
    DRUKAIR: {
        EMPLOYEE_DETAIL: {
            proofName: "Verify Druk Air Employee Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/fe62fe63-4930-4c13-92e3-6e9d967eb8e0",
            attributes: [
                { name: "Employee Number" },
                { name: "Designation" },
                { name: "Section" },
                { name: "Department " },
            ],
        },
    },
    HACKATHON: {
        DIGITAL_LAGTHRAM: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/626de6e5-c6e1-46ee-b6d9-0eda2082b575",
            attributes: [
                { name: "Ownership Type" },
                { name: "Land Type" },
                { name: "Thram No" },
                { name: "Plot No" },
                { name: "Location" },
                { name: "Status" },
                { name: "Area" },
                { name: "Land DID" },
            ],
        },
        DRUKCONNECT_VOTE: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/082e3893-7352-4823-9b39-e34daf49112e",
            attributes: [
                { name: "Proposal ID" },
                { name: "Proposal Name" },
                { name: "Voted Time" },
                { name: "Voted" },
            ],
        },
        SA_TOK: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/69b4633e-a59e-42b1-9010-38f582027188",
            attributes: [
                { name: "Plot ID" },
                { name: "Property Name" },
                { name: "Precinct" },
                { name: "Category" },
                { name: "Land Type" },
                { name: "Area" },
                { name: "Status" },
            ],
        },
        LEASE_AGREEMENT: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/e4dc6c94-5833-41c9-9450-9eff0f41d84b",
            attributes: [
                { name: "Lease ID" },
                { name: "Lease Duration" },
                { name: "Use" },
                { name: "Rent" },
                { name: "Address" },
                { name: "Lessor" },
            ],
        },
        UNIVERSITY_ID: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/6e6ae22d-8391-439e-8b74-16603777a782",
            attributes: [
                { name: "Institution Name" },
                { name: "Degree Name" },
                { name: "Graduation Date" },
                { name: "Certificate URL" },
            ],
        },
        WORK_PERMIT: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/2eec0570-1c8b-4c06-a482-de9774d4275e",
            attributes: [
                { name: "Permit Number" },
                { name: "Expiry Date" },
                { name: "Issue Date" },
                { name: "Job Category" },
                { name: "Employer Name" },
                { name: "Location Dzongkhag " },
                { name: "Location Gewog " },
                { name: "Worksite" },
            ],
        },
        CIVIC_CHAMPION: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/8c9df463-776f-49d9-8684-e98895a31f0a",
            attributes: [
                { name: "Issue Date" },
                { name: "Issued By" },
            ],
        },
        DRUKCONNECT_LOAN: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/2a70cf77-e683-4c6a-af80-ae4c10da1628",
            attributes: [
                { name: "Loan ID" },
                { name: "Amount" },
                { name: "Tenure" },
                { name: "Interest Rate" },
                { name: "Type" },
                { name: "Disbursed At" },
                { name: "Repaid At" },
                { name: "Status" },
            ],
        },
        DRUKCONNECT_CERTIFICATE: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/9c595943-01b9-4f50-82a5-d7a30539f82c",
            attributes: [
                { name: "Certificate ID" },
                { name: "Issued At" },
                { name: "Expired At" },
                { name: "Level" },
                { name: "Skill Acquired" },
                { name: "Reputation Points" },
            ],
        },

        TDI_CREDENTIALS: {
            proofName: "Verify Hackathon Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/9e25c8f8-fcda-4d12-a80a-d1e0314baf42",
            attributes: [
                { name: "Emergency Contact Number" },
                { name: "TDI No" },
                { name: "Blood Group" },
                { name: "Visa ID" },
                { name: "Visa Type" },
                { name: "DOB" },
                { name: "Nationality" },
                { name: "Present Address" },
                { name: "Email Address" },
                { name: "Verified At" },
                { name: "Visa Expiry Date" },
                { name: "Visa Issue Date" },
                { name: "TDI Issue Date" },
                { name: "Passport Expiry Date" },
                { name: "Gender" },
                { name: "Full Name" },
                { name: "Marital Status" },
                { name: "Embassy Contact" },
            ],
        },
    },
    CHAIN_ZEEPER_X_NLCS: {
        LAND_HOLDINGS: {
            proofName: "Verify Chain-Zeeper X NLCS Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/dfc89790-a545-47e7-bf01-42f60b4490fb",
            attributes: [
                { name: "Total Properties" },
                { name: "Last Updated" },
                { name: "Web Portal" },
                { name: "Qualification" },
                { name: "Json Data" },
            ],
        },
    },
    iBLS_BUSINESS_LICENSE: {
        BUSINESS_LICENSE: {
            proofName: "Verify ibls Business License Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/3f3935de-60f1-4a60-b576-286e439388f6",
            attributes: [
                { name: "License No" },
                { name: "Issue Date" },
                { name: "Validity Date" },
                { name: "Last Renewal Date" },
                { name: "Establishment Name" },
                { name: "Dzongkhag" },
                { name: "Gewog" },
                { name: "Village" },
                { name: "Exact Location" },
                { name: "Activity details" },
                { name: "Business classification" },
                { name: "Investment Scale" },
                { name: "BSIC Code" },
            ],
        },
    },
    PASSPORT: {
        PASSPORT: {
            proofName: "Verify Passport Details",
            schemaUrl: "https://dev-schema.ngotag.com/schemas/c5b1bc97-aaa9-4237-804e-72029d81bf59",
            attributes: [
                { name: "Passport Type" },
                { name: "Passport Number" },
                { name: "Birth Place" },
                { name: "Issue Date" },
                { name: "Expiry Date" },
                { name: "Issuing Authority" },
                { name: "Country Code" },
                { name: "MRZ Code" },
                { name: "Status" },
            ],
        },
    },
    MoENR: {
    "RTPS-New_Construction": {
        proofName: "RTPS - New Construction",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/1931b9d8-151e-41eb-a629-16becd36482a",
        attributes: [
        { name: "Application Number" },
        { name: "Construction Approval Number" },
        { name: "Expiry Date" },
        { name: "Number of Trees/Logs" },
        { name: "Royalty" },
        { name: "House Storied" },
        { name: "Source of Timber/Log" },
        ],
    },

    "RTPS-Renovation_of_House": {
        proofName: "RTPS - Renovation of House",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/cba0cb41-1189-4f36-916b-2c0cd2064d12",
        attributes: [
        { name: "Application Number" },
        { name: "Construction Approval Number" },
        { name: "Expiry Date" },
        { name: "Number of Trees/Logs" },
        { name: "Royalty" },
        { name: "House Storied" },
        { name: "Source of Timber/Log" },
        ],
    },

    "RTPS-Other_Construction": {
        proofName: "RTPS - Other Construction",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/a6f13930-fb5a-4a11-9adb-7bcb589d010f",
        attributes: [
        { name: "Application Number" },
        { name: "Recommendation Letter" },
        { name: "Expiry Date" },
        { name: "Number of Trees/Logs" },
        { name: "Royalty" },
        { name: "Source of Timber/Log" },
        ],
    },

    "RTPS-New_Construction_Sawing": {
        proofName: "RTPS - New Construction Sawing",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/d7da9da8-6070-442c-abee-d7f0fc7087d1",
        attributes: [
        { name: "Approval Number" },
        { name: "Mode of Sawing" },
        { name: "Sawing Operator" },
        { name: "Sawing Location" },
        { name: "Status" },
        { name: "Number of Trees/Volume" },
        { name: "Source of Timber/Log" },
        ],
    },

    "RTPS-Renovation_Sawing": {
        proofName: "RTPS - Renovation Sawing",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/6789670e-9c4c-40a9-9102-271ca2f13d20",
        attributes: [
        { name: "Approval Number" },
        { name: "Mode of Sawing" },
        { name: "Sawing Operator" },
        { name: "Sawing Location" },
        { name: "Status" },
        { name: "Number of Trees/Volume" },
        { name: "Source of Timber/Log" },
        ],
    },

    "RTPS-Other_Construction_Sawing": {
        proofName: "RTPS - Other Construction Sawing",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/c75c1425-ca96-4b5e-94ae-bdc8a608b08c",
        attributes: [
        { name: "Approval Number" },
        { name: "Mode of Sawing" },
        { name: "Sawing Operator" },
        { name: "Sawing Location" },
        { name: "Status" },
        { name: "Number of Trees/Volume" },
        { name: "Source of Timber/Log" },
        ],
    },

    FOREST_CLEARANCE_PRIVATE_REMOVAL: {
        proofName: "Forest Clearance - Private Removal",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/96f0d64b-f86d-403b-a747-5352e28b0d9a",
        attributes: [
        { name: "Approval ID" },
        { name: "Thram Number" },
        { name: "Plot Number" },
        { name: "Name of the Plot" },
        { name: "Type of Forest Produce" },
        { name: "Total Trees & Poles Marked" },
        { name: "Source of Timber/Log" },
        ],
    },
        "RTPS-Flagpoles/Firewood/Fencing_Post": {
        proofName: "Forest Clearance - Private Removal",
        schemaUrl: "https://dev-schema.ngotag.com/schemas/2b229d8b-dcb5-42c3-904d-4dd0e045ea79",
        attributes: [
        { name: "Approval ID" },
        { name: "Approved Quantity" },
        { name: "Type of Wood" },
        { name: "Purpose" },
        { name: "Source of Timber/Log" },
        ],
    },
    },

};
