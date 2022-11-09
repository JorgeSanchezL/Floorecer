import { Router } from 'express';

import { getAllItemShop,buyItem} from '../controllers/garden.controller.js';

const router = Router();

router.get('/items/all', getAllItemShop);
router.post('/buyItem', buyItem);

export default router;