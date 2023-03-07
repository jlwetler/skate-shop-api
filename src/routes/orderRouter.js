import * as ordersController from '../controllers/ordersController.js';
import { Router } from 'express';

const router = Router();

router.get('/get-orders', ordersController.getOrders);

router.post('/finish-order', ordersController.finishOrder);

export default router;