"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProofRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const ndiConfig_1 = require("../config/ndiConfig");
const verifierUrl = `${ndiConfig_1.ndiVerifierConfig.baseUrl}${ndiConfig_1.ndiVerifierConfig.proofRequestPath}`;
const createProofRequest = async (accessToken) => {
    try {
        const httpsAgent = new https_1.default.Agent({
            rejectUnauthorized: false, // only for dev / staging
        });
        const proofRequestBody = {
            proofName: "Verify Foundational ID",
            proofAttributes: [
                {
                    name: "ID Number",
                    restrictions: [
                        {
                            schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
                        },
                    ],
                },
                {
                    name: "Full Name",
                    restrictions: [
                        {
                            schema_name: "https://dev-schema.ngotag.com/schemas/c7952a0a-e9b5-4a4b-a714-1e5d0a1ae076",
                        },
                    ],
                },
            ],
        };
        console.log("NDI VERIFIER REQUEST BODY:", proofRequestBody);
        console.log("NDI VERIFIER URL:", verifierUrl);
        const response = await axios_1.default.post(verifierUrl, proofRequestBody, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            httpsAgent,
        });
        console.log("NDI VERIFIER RESPONSE DATA:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("NDI VERIFIER ERROR:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};
exports.createProofRequest = createProofRequest;
