"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNDIAccessToken = void 0;
const ndiAuth_service_1 = require("../services/ndiAuth.service");
const getNDIAccessToken = async (_req, res) => {
    try {
        const data = await (0, ndiAuth_service_1.authenticateWithNDI)();
        res.json(data);
        console.log("NDI authentication successful:", data);
    }
    catch (error) {
        res.status(500).json({ message: "NDI authentication failed", error: error.message });
    }
};
exports.getNDIAccessToken = getNDIAccessToken;
