"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUserProof = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const ndiVerifier_service_1 = require("../services/ndiVerifier.service");
const requestUserProof = async (req, res) => {
    // 1️⃣ Extract access token from Authorization header
    const authHeader = req.headers.authorization || "";
    const accessToken = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;
    if (!accessToken) {
        return res.status(400).json({
            message: "Authorization token missing or invalid",
        });
    }
    try {
        // 2️⃣ Call existing service (UNCHANGED)
        const ndiResponse = await (0, ndiVerifier_service_1.createProofRequest)(accessToken);
        /**
         * Expected structure from service:
         * {
         *   statusCode,
         *   message,
         *   data: {
         *     proofRequestName,
         *     proofRequestThreadId,
         *     proofRequestURL,
         *     deepLinkURL
         *   }
         * }
         */
        const { proofRequestURL, proofRequestThreadId, proofRequestName, deepLinkURL, } = ndiResponse.data;
        // 3️⃣ Generate QR from ProofRequestURL
        const qrDataUrl = await qrcode_1.default.toDataURL(proofRequestURL);
        // 4️⃣ Respond to frontend
        return res.status(201).json({
            statusCode: 201,
            message: "Proof URL created successfully",
            data: {
                proofRequestName,
                proofRequestThreadId,
                proofRequestURL,
                deepLinkURL,
                qrDataUrl,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create proof request",
            error: error.message,
        });
    }
};
exports.requestUserProof = requestUserProof;
