import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";

// Temporary storage for review (optional)
let reviewData: any = null;

// -------------------
// Receive data for review
// -------------------
export const submitForReview = (req: Request, res: Response) => {
  try {
    const { body } = req;

    // If files are uploaded via multer
    const files = (req as any).files || [];

    // Store temporarily for review (optional)
    reviewData = { body, files };

    res.status(200).json({
      message: "Data received for review",
      data: {
        body,
        files: files.map((f: any) => ({ originalname: f.originalname, size: f.size })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error receiving data", error: error.message });
  }
};

// -------------------
// Send confirmed data to BIL
// -------------------
export const sendToBIL = async (req: Request, res: Response) => {
  try {
    const payload = reviewData || req.body;

    if (!payload) {
      return res.status(400).json({ message: "No data to send. Please submit first." });
    }

    const form = new FormData();

    // Append JSON fields
    form.append("data", JSON.stringify(payload.body || payload));

    // Append files if available
    (payload.files || []).forEach((file: any) => {
      form.append("files", file.buffer, { filename: file.originalname, contentType: file.mimetype });
    });

    // Replace with actual BIL API URL
    const BIL_API_URL = "http://119.2.100.178/api/cdms/onboard-customer";

    const response = await axios.post(BIL_API_URL, form, {
      headers: form.getHeaders(),
    });

    // Clear temporary storage
    reviewData = null;

    res.status(200).json({ message: "Data sent to BIL successfully", bilResponse: response.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to send data to BIL", error: error.message });
  }
};
