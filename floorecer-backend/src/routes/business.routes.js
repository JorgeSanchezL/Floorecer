import { Router } from 'express';

import { newBusiness, getBusiness,updateBusiness } from '../controllers/business.controller.js';

const router = Router();

router.post('/newBusiness',newBusiness);
router.get('/getBusiness',getBusiness);
router.post('/updateBusiness',updateBusiness);


export default router;