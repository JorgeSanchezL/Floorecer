import { Router } from 'express';

import { getAllPOI } from '../controllers/map.controller.js';
import { checkUserVerified, verifyCode ,uploadVerifyCode, sendEmail } from '../controllers/map.controller.js';

const router = Router();

router.get('/poi/all', getAllPOI);
router.get('/users/verified', checkUserVerified);
router.get('/verify', verifyCode);
router.get('/verify-mail', sendEmail)
router.post('/verify-code', uploadVerifyCode);

export default router;