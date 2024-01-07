import express from 'express';
import { OrderItemController } from '../../controllers/Order Controllers/OrderController';

const router = express.Router();

// Get all order items by username
router.get('/order-items', OrderItemController.getAllOrderItemsByUsername);

// Create or update an order item
router.post('/order-items', OrderItemController.createOrderItemOrUpdate);

// Delete an order item
router.delete('/order-items', OrderItemController.deleteOrderItem);

export default router;
