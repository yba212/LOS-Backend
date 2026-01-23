"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ndiControllers_1 = require("../controllers/ndiControllers");
const ndi_weebhook_1 = require("../webhooks/ndi.weebhook");
const ndiAuth_controller_1 = require("../controllers/ndiAuth.controller");
// import {requestUserProof} from "../controllers/ndiVerifier.controller"
const router = (0, express_1.Router)();
router.get("/create-session", ndiControllers_1.createSession);
router.get("/session-status/:sessionId", ndiControllers_1.getSessionStatus);
router.post("/webhook", ndi_weebhook_1.ndiWebhook);
router.post("/auth", ndiAuth_controller_1.getNDIAccessToken);
// router.post("/proof-request", requestUserProof)
exports.default = router;
