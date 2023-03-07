import * as ordersController from '../controllers/ordersController.js';
import { authValidation } from '../middlewares/tokenMiddleware.js';
import { Router } from 'express';

const router = Router();

router.get('/get-orders', authValidation, ordersController.getOrders);

router.post('/finish-order', authValidation, ordersController.finishOrder);

export default router;