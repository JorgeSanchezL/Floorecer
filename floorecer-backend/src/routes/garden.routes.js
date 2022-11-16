import { Router } from 'express';

import { getAllItemShop,buyItem,getItem} from '../controllers/garden.controller.js';

const router = Router();

router.get('/items/all', getAllItemShop);
router.get('/items/:uid', getItem);
router.post('/buyItem', buyItem);

export default router;