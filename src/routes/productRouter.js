import * as productsController from '../controllers/productsController.js'
import * as searchController from '../controllers/searchController.js';
import { Router } from 'express';

const router = Router();

router.get('/products/:category', productsController.products);

router.get('/products/filter/:category', productsController.filterProducts);

router.get('/search/:search', searchController.search);

export default router;