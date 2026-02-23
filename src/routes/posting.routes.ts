import { Router } from "express";
import multer from "multer";
import { submitForReview, sendToBIL } from "../controllers/posting.controllers";

const router = Router();

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Submit data for review
router.post("/submit-data", upload.array("files"), submitForReview);

// Send confirmed data to BIL
router.post("/send-to-bil", sendToBIL);

export default router;
