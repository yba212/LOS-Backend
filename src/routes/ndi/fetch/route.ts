// Backend/src/routes/ndi/fetch/route.ts
import { Router } from "express";
import { supabase } from "../../../lib/supabase";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("✅ /api/ndi/fetch called"); // debug: route hit

    const id_number = req.query.id_number as string;
    console.log("Query id_number:", id_number);

    let query = supabase.from("ndi_users").select("*");
console.log("Supabase client ready:", supabase);
    if (id_number) {
      query = query.eq("id_number", id_number);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Supabase data:", data);

    res.json({ data });
  } catch (err) {
    console.error("Fetch route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;