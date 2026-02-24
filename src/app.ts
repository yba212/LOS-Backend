import express from "express"
import cors from "cors"
import ndiRoutes from "./routes/ndi.routes"
import ndiVerifierRoutes from "./routes/ndi.routes"
import bodyParser from "body-parser"
import { ndiWebhookHandler } from "./controllers/ndiWebhook.controllers";
import ndiWebhookRoutes from "./routes/ndi.routes";
import proofResultRoutes from "./routes/proofResult.routes"
import postRoutes from "./routes/posting.routes"

import ndiStoreRouter from "./routes/ndi/store/route";
import fetchRouter from "./routes/ndi/fetch/route";

import personalRoutes from "./routes/personal.route";
import { upload } from "./services/upload"

const app = express()
// server.ts or app.ts (top of file)


// console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
// console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY?.slice(0, 5) + '...')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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


app.use("/api/ndi/store", ndiStoreRouter);
app.use("/api/ndi/fetch", fetchRouter);
console.log("Backend URL:", process.env.BACKEND_URL);


app.use ("/api", personalRoutes);
export default app
