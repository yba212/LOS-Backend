import express from 'express';
import { submitPersonalDetails } from '../controllers/personal.controller';
import { upload } from '../services/upload';

const router = express.Router();

// Use upload.fields() for multiple file fields
router.post(
  '/personal',
  upload.fields([
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'currAddressProof', maxCount: 1 },
    { name: 'familyTree', maxCount: 1 },
  ]),
  submitPersonalDetails
);

export default router;