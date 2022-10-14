import { Router } from 'express';

import { getAllPOI } from '../controllers/map.controller.js';

const router = Router();

router.get('/poi/all', getAllPOI);

export default router;