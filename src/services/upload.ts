import multer from "multer";
import path from "path";



const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Accept multiple files with field name "documents"
// export const upload = multer({
//   storage,
// }).fields([
//   { name: "documents", maxCount: 5 }, // <-- Must match Postman field key
// ]);

