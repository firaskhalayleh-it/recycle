import cookieParser from "cookie-parser";
import { OrderItemsController } from "../../controllers/Order Controllers/OrderItemsController";
import express, { Router } from "express";

const router = Router();


router.get('/orders', OrderItemsController.getOrdersByUsername);
router.post('/orders/submitted', OrderItemsController.submitOrder);
export default router;