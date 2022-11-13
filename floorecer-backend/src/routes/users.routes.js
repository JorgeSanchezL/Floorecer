import { Router } from 'express';
import { getUser, searchUser, getAllUser, getActualPlan, getUsersByIds } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/u/all',getAllUser);
router.get('/search/:contains', searchUser)
router.post('/getActualPlan', getActualPlan);
router.post('/getUsersById', getUsersByIds);

export default router;