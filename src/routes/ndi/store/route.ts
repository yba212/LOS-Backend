// Backend/src/routes/ndi/store/route.ts
import { supabase } from "../../../lib/supabase";
import { Router } from "express";

const router = Router();

function convertToISO(date: string) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

// POST /ndi/store
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const proof = body.attributes || body;

    const idNumber = proof["ID Number"] || proof.attributes?.["ID Number"];
    if (!idNumber) return res.status(400).json({ success: false, message: "Missing ID Number" });

    // Check if user already exists
    const { data: existing, error: fetchError } = await supabase
      .from("ndi_users")
      .select("id_number")
      .eq("id_number", idNumber)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    if (existing) {
      return res.json({ success: true, message: "User already exists", data: existing });
    }

    // Map attributes
    const mappedData = {
      // thread_id: proof.threadId || null,
      id_type: proof["ID Type"] || proof.attributes?.["ID Type"] || null,
      id_number: idNumber,
      full_name: proof["Full Name"] || proof.attributes?.["Full Name"] || null,
      gender: proof["Gender"] || proof.attributes?.["Gender"] || null,
      date_of_birth: proof["Date of Birth"]
        ? convertToISO(proof["Date of Birth"])
        : proof.attributes?.["Date of Birth"]
        ? convertToISO(proof.attributes["Date of Birth"])
        : null,
      citizenship: proof["Citizenship"] || proof.attributes?.["Citizenship"] || null,
      mobile_number: proof["Mobile Number"] || proof.attributes?.["Mobile Number"] || null,
      mobile_type: proof["Type"] || proof.attributes?.["Type"] || null,
      email: proof["Email"] || proof.attributes?.["Email"] || null,
      thram_number: proof["Thram Number"] || proof.attributes?.["Thram Number"] || null,
      house_number: proof["House Number"] || proof.attributes?.["House Number"] || null,
      village: proof["Village"] || proof.attributes?.["Village"] || null,
      gewog: proof["Gewog"] || proof.attributes?.["Gewog"] || null,
      dzongkhag: proof["Dzongkhag"] || proof.attributes?.["Dzongkhag"] || null,
      country: proof["Country"] || proof.attributes?.["Country"] || null,
      proof_status: body.status || null,
      received_at: proof.receivedAt || new Date().toISOString()
    };

    const { data, error } = await supabase.from("ndi_users").insert([mappedData]).select();
    if (error) throw error;

    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("NDI store error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
});

export default router;