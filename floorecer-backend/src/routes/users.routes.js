import { Router } from 'express';

import { getUser, searchUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);
router.get('/search', searchUser)

export default router;