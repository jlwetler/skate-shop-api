import * as categoriesController from '../controllers/categoriesController.js';
import * as brandsController from '../controllers/brandsController.js';
import { Router } from 'express';

const router = Router();

router.get('/categories', categoriesController.categories);

router.get('/subcategories/:category', categoriesController.subCategories);

router.get('/brands', brandsController.brands);

router.get('/brands/:brandId', brandsController.productBrand);

export default router;