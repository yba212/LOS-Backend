"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ndi_routes_1 = __importDefault(require("./routes/ndi.routes"));
const ndiVerifier_routes_1 = __importDefault(require("./routes/ndiVerifier.routes"));
const ndiWebhook_controllers_1 = require("./controllers/ndiWebhook.controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/ndi", ndi_routes_1.default);
app.use("/api/ndi-verifier", ndiVerifier_routes_1.default);
app.post("/webhook", ndiWebhook_controllers_1.ndiWebhookHandler);
exports.default = app;
