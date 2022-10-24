import { Router } from 'express';

import { getUser, searchUser,getAllUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/u/all',getAllUser);
router.get('/search/:contains', searchUser)

export default router;