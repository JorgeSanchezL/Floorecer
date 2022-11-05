import { Router } from 'express';

import { getUser, searchUser, getAllUser, deleteProfileImage, getActualPlan } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/u/all', getAllUser);
router.get('/search/:contains', searchUser);
router.delete('/profileImage', deleteProfileImage);
router.post('/getActualPlan',getActualPlan)

export default router;