import express from "express"
import cors from "cors"
import ndiRoutes from "./routes/ndi.routes"
import ndiVerifierRoutes from "./routes/ndi.routes"
import bodyParser from "body-parser"
import { ndiWebhookHandler } from "./controllers/ndiWebhook.controllers";
import ndiWebhookRoutes from "./routes/ndi.routes";
import proofResultRoutes from "./routes/proofResult.routes"
import postRoutes from "./routes/posting.routes"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/ndi/webhook", ndiWebhookRoutes);

app.use("/api/ndi", ndiRoutes)
app.use("/api/ndi-verifier", ndiVerifierRoutes)  //proof-request
app.post("/webhook", ndiWebhookHandler);

// Mount webhook endpoint exactly where NDI expects it
app.post("/ndi/webhook", ndiWebhookHandler)


// user data from proof request
app.use("/api/proof-result", proofResultRoutes);

// Posting user data to BIl DB and file upload
app.use("/api/post", postRoutes);

export default app
