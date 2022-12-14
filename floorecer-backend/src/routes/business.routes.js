import { Router } from 'express';

import upload from '../middlewares/imgUpload.js';

import { newBusiness, getBusinesses, getBusiness, updateBusiness,
    getCategories, getAllBusinesses, getAllBusinessesByCategory,
    promoteBusiness,
    changeStatus,
    upgradePoints,
    deleteBusiness} from '../controllers/business.controller.js';


const router = Router();

router.post('/newBusiness', upload, newBusiness);
router.get('/getBusiness',getBusiness);
router.post('/updateBusiness', upload, updateBusiness);
router.post('/getbusinesses',getBusinesses);
router.post('/promotebusiness',promoteBusiness);
router.post('/changeStatus',changeStatus);
router.get('/getCategories',getCategories);
router.get('/getAllBusinesses',getAllBusinesses);
router.post('/upgradePoints',upgradePoints);
router.get('/getAllBusinessesByCategory/:category',getAllBusinessesByCategory);
router.post('/deleteBusiness',deleteBusiness);
export default router;