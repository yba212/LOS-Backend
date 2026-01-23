"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateWithNDI = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const ndiConfig_1 = require("../config/ndiConfig");
const authenticateWithNDI = async () => {
    try {
        const httpsAgent = new https_1.default.Agent({
            rejectUnauthorized: false, // DEV ONLY
        });
        const response = await axios_1.default.post(ndiConfig_1.ndiAuthConfig.authUrl, {
            client_id: ndiConfig_1.ndiAuthConfig.clientId,
            client_secret: ndiConfig_1.ndiAuthConfig.clientSecret,
            grant_type: "client_credentials",
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            httpsAgent,
        });
        return response.data;
    }
    catch (error) {
        console.error("NDI AUTH ERROR STATUS:", error.response?.status);
        console.error("NDI AUTH ERROR DATA:", error.response?.data);
        console.error("NDI AUTH ERROR MESSAGE:", error.message);
        throw new Error(error.response?.data || error.message);
    }
};
exports.authenticateWithNDI = authenticateWithNDI;
