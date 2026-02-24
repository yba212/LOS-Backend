import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const submitPersonalDetails = async (req: Request, res: Response) => {
  try {
    const data = JSON.parse(req.body.data);
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!data.identificationNo) {
      return res.status(400).json({
        success: false,
        message: "CID is required"
      });
    }

    // 1️⃣ Check if CID already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('personal_details')
      .select('*')
      .eq('identification_no', data.identificationNo)
      .maybeSingle();

    if (checkError) throw checkError;

    // 2️⃣ If exists → return existing record
    if (existingUser) {
      return res.status(200).json({
        success: true,
        alreadyExists: true,
        data: existingUser
      });
    }

    // 3️⃣ Upload Files
    const uploadedFiles: Record<string, string> = {};

    for (const field of ['passportPhoto', 'currAddressProof', 'familyTree']) {
      const file = files?.[field]?.[0];
      if (!file) continue;

      const fileName = `${data.identificationNo}-${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;

      const { error: storageError } = await supabase.storage
        .from('user-files')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (storageError) throw storageError;

      const { data: publicUrlData } = supabase.storage
        .from('user-files')
        .getPublicUrl(fileName);

      uploadedFiles[field] = publicUrlData.publicUrl;
    }

    // 4️⃣ Insert New Record
    const { data: insertedData, error: insertError } = await supabase
      .from('personal_details')
      .insert([
        {
          applicant_name: data.applicantName,
          gender: data.gender,
          nationality: data.nationality,
          identification_type: data.identificationType,
          identification_no: data.identificationNo,
          date_of_birth: data.dateOfBirth,
          curr_email: data.currEmail,
          curr_contact: data.currContact,
          curr_country: data.currCountry,
          curr_dzongkhag: data.currDzongkhag,
          curr_gewog: data.currGewog,
          curr_village: data.currVillage,
          curr_house_no: data.currHouseNo,
          curr_thram: data.currThram,
          perm_country: data.permCountry,
          perm_dzongkhag: data.permDzongkhag,
          perm_gewog: data.permGewog,
          perm_village: data.permVillage,
          perm_house: data.permHouse,
          perm_thram: data.permThram,
          employment_status: data.employmentStatus,
          bank_name: data.bankName,
          bank_account: data.bankAccount,
          pep_person: data.pepPerson,
          pep_related: data.pepRelated,
          passport_photo_url: uploadedFiles['passportPhoto'] || null,
          curr_address_proof_url: uploadedFiles['currAddressProof'] || null,
          family_tree_url: uploadedFiles['familyTree'] || null,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    return res.status(200).json({
      success: true,
      alreadyExists: false,
      data: insertedData
    });

  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};