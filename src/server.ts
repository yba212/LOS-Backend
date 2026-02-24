// server.ts (top of file)
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" }); // MUST be first

import app from "./app";

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Key:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 5) + "...");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));