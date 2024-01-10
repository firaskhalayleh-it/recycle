import express from 'express';
import { OrderController } from '../../controllers/Order Controllers/OrderController';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(express.json());
router.use(cookieParser())

// Get all order items by username
router.get('/order-items', OrderController.getOrdersByUsername);

// Create or update an order item
router.post('/order-items', OrderController.createOrderItem);


router.post('/order-items/update', OrderController.updateOrderItem);
// Delete an order item
// router.delete('/order-items', OrderItemController.deleteOrderItem);

export default router;
