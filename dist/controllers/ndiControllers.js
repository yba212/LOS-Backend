"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionStatus = exports.createSession = void 0;
const ndi_services_1 = require("../services/ndi.services");
const createSession = async (_, res) => {
    const session = await (0, ndi_services_1.createNDISession)();
    res.json(session);
};
exports.createSession = createSession;
const getSessionStatus = (req, res) => {
    const session = (0, ndi_services_1.getNDISession)(req.params.sessionId);
    if (!session) {
        return res.status(404).json({ status: "NOT_FOUND" });
    }
    res.json(session);
};
exports.getSessionStatus = getSessionStatus;
