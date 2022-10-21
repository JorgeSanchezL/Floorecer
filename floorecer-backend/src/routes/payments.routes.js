import { Router } from 'express';

import { makePayment } from '../controllers/payments.controller.js';

const router = Router();

router.post('/', makePayment);

export default router;