import { Router } from 'express';

import { getUser, searchUser, getGarden, getSeeds, getAllUser, deleteProfileImage, getActualPlan, updateSeedAmount } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/u/all', getAllUser);
router.get('/search/:contains', searchUser);
router.get('/gardenInfo/:user', getGarden)
router.get('/mySeeds/:user', getSeeds)
router.delete('/profileImage', deleteProfileImage);
router.post('/getActualPlan',getActualPlan)
router.post('/updateSeed', updateSeedAmount)


export default router;