import { Router } from 'express';

import { getUser, searchUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/search/:contains', searchUser)

export default router;