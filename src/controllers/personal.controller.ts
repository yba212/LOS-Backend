import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const submitPersonalDetails = async (req: Request, res: Response) => {
  try {
        // 1️⃣ Parse JSON text field
    const data = JSON.parse(req.body.data);


    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

       if (!data.identificationNo) {
      return res.status(400).json({
        error: 'CID (identificationNo) is required',
      });
    }

    // 🔎 1️⃣ CHECK IF CID ALREADY EXISTS
    const { data: existingUser, error: checkError } = await supabase
      .from('personal_details')
      .select('id')
      .eq('identification_no', data.identificationNo)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingUser) {
      return res.status(400).json({
        error: 'Record with this CID already exists',
      });
    }

    // 📂 2️⃣ Upload Files to STorage
    const uploadedFiles: Record<string, string> = {};

    for (const field of ['passportPhoto', 'currAddressProof', 'familyTree']) {
      const file = files?.[field]?.[0];
      if (!file) continue;

      const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;

      const { error: storageError } = await supabase.storage
        .from('party-documnets') // your correct bucket name
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (storageError) throw storageError;

      const { data: publicUrlData } = supabase.storage
        .from('party-documnets')
        .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;

        console.log("Generated URL:", publicUrl); // 👈 Add this

        uploadedFiles[field] = publicUrl;
    }

    // 📝 3️⃣ Insert Record
    const { data: dbData, error: dbError } = await supabase
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
          passport_photo_url: uploadedFiles['passportPhoto'],
          curr_address_proof_url: uploadedFiles['currAddressProof'],
          family_tree_url: uploadedFiles['familyTree'],
        },
      ])
      .select()
      .single();

    //   if (insertError) throw insertError;
    if (dbError) throw dbError;

    return res.status(201).json({
      success: true,
      message: 'Personal details submitted successfully',
      data: dbData,
    });

  } catch (error: any) {
    console.error('Error submitting personal details:', error);
    return res.status(500).json({ error: error.message });
  }
};