import { Router } from 'express';

import { newBusiness } from '../controllers/business.controller.js';
import {getBusinesses} from '../controllers/business.controller.js';
const router = Router();

router.post('/newBusiness',newBusiness);
router.post('/getbusiness',getBusinesses);

export default router;