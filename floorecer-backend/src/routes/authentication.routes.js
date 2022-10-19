import { Router } from 'express';

import { register, signIn } from '../controllers/authentication.controller.js';

const router = Router();

router.get('/userSign/:email&:password', signIn);
router.get('/userRegister',register);

export default router;