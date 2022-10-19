import { Router } from 'express';

import { getUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/:uuid', getUser);

export default router;