import { Router } from 'express';

import { getAllItemShop, buyItem,getItem, getGarden, getSeeds, updateGarden, updateItems } from '../controllers/garden.controller.js';

const router = Router();

router.get('/items/all', getAllItemShop);
router.get('/gardenInfo/:user', getGarden)
router.get('/mySeeds/:user', getSeeds)
router.get('/items/:uid', getItem);
router.post('/buyItem', buyItem);
router.post('/updateItems', updateItems)
router.post('/updateGarden', updateGarden)

export default router;