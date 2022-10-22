import { Router } from 'express';

import { newBusiness } from '../controllers/business.controller.js';

const router = Router();

router.post('/newBusiness',newBusiness);

export default router;