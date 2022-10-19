import { Router } from 'express';

import { checkUserVerified, verifyCode ,updateVerifyCode, sendEmail } from '../controllers/userVerification.controller.js';

const router = Router();

router.get('/user', checkUserVerified);
router.get('/verify', verifyCode);
router.get('/mail', sendEmail)
router.put('/code', updateVerifyCode);

export default router;