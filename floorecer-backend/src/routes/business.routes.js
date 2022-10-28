import { Router } from 'express';

import upload from '../middlewares/imgUpload.js';

import { newBusiness, getBusinesses, getBusiness, updateBusiness,
    getCategories, getAllBusinesses, getAllBusinessesByCategory,
    promoteBusiness} from '../controllers/business.controller.js';


const router = Router();

router.post('/newBusiness', upload, newBusiness);
router.get('/getBusiness',getBusiness);
router.post('/updateBusiness',updateBusiness);
router.post('/getbusinesses',getBusinesses);
router.post('/promotebusiness',promoteBusiness);
router.get('/getCategories',getCategories);
router.get('/getAllBusinesses',getAllBusinesses);
router.get('/getAllBusinessesByCategory/:category',getAllBusinessesByCategory);
export default router;