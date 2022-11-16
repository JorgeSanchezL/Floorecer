import { Router } from 'express';

import { getAllItemShop, buyItem, getGarden, getSeeds, updateSeedAmount, updateGarden } from '../controllers/garden.controller.js';

const router = Router();

router.get('/items/all', getAllItemShop);
router.get('/gardenInfo/:user', getGarden)
router.get('/mySeeds/:user', getSeeds)
router.post('/buyItem', buyItem);
router.post('/updateSeeds', updateSeedAmount)
router.post('/updateGarden', updateGarden)

export default router;