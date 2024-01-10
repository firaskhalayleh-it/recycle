import { OrderItemsController } from "../../controllers/Order Controllers/OrderItemsController";
import { Router } from "express";

const router = Router();

router.get('/orders', OrderItemsController.getOrdersByUsername);

export default router;