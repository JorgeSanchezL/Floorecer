import { Router } from 'express';

import { register, signIn } from '../controllers/authentication.controller.js';

const router = Router();

router.get('/userSign/:email&:password', signIn);
router.post('/userRegister',register);
//:email&:password&:numberphone

export default router;