// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.verifySession = exports.getNDISession = exports.createNDISession = void 0;
// const uuid_1 = require("uuid");
// const sessions = {};
// const createNDISession = () => {
//     const sessionId = (0, uuid_1.v4)();
//     const session = {
//         sessionId,
//         status: "PENDING",
//         createdAt: new Date()
//     };
//     sessions[sessionId] = session;
//     return {
//         sessionId,
//         qrData: JSON.stringify({
//             sessionId,
//             purpose: "eKYC",
//             callbackUrl: process.env.NDI_WEBHOOK_URL
//         })
//     };
// };
// exports.createNDISession = createNDISession;
// const getNDISession = (sessionId) => {
//     return sessions[sessionId];
// };
// exports.getNDISession = getNDISession;
// const verifySession = (sessionId, userData) => {
//     if (sessions[sessionId]) {
//         sessions[sessionId].status = "VERIFIED";
//         sessions[sessionId].userData = userData;
//     }
// };
// exports.verifySession = verifySession;
