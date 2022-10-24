import { Router } from 'express';

import { newBusiness, getBusinesses,getBusiness,updateBusiness, getCategories, getAllBusinesses, getAllBusinessesByCategory } from '../controllers/business.controller.js';


const router = Router();

router.post('/newBusiness',newBusiness);
router.get('/getBusiness',getBusiness);
router.post('/updateBusiness',updateBusiness);
router.post('/getbusinesses',getBusinesses);
router.get('/getCategories',getCategories);
router.get('/getAllBusinesses',getAllBusinesses);
router.get('/getAllBusinessesByCategory/:category',getAllBusinessesByCategory);
export default router;