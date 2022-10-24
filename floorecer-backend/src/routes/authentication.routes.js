import { Router } from 'express';

import { register, signIn, profileUser} from '../controllers/authentication.controller.js';

const router = Router();

router.get('/userSign/:email&:password', signIn);
router.post('/userRegister',register);
router.post('/userProfile',profileUser);
//:email&:password&:numberphone

export default router;