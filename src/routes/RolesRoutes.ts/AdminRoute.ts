import { AdminRoleController } from "../../controllers/Roles Controllers/AdminRole";
import { Router } from "express";

const router = Router();

router.get('/users/total', AdminRoleController.getTotalUsers);
router.get('/products/total', AdminRoleController.getTotalProducts);
router.get('/orders/total', AdminRoleController.getTotalOrders);
router.get('/orders/pending', AdminRoleController.getTotalOrdersPending);
router.get('/orders/not-delivered', AdminRoleController.getOrdersNotDelivered);
router.get('/products/out-of-stock', AdminRoleController.getProductsOutOfStock);
router.get('/products/per-order', AdminRoleController.getProductsPerOrders);

router.post('/assign/admin', AdminRoleController.assignAdminRole);
router.post('/assign/seller', AdminRoleController.assignSellerRole);
router.post('/assign/driver', AdminRoleController.assignDriverRole);
router.post('/assign/OrderToDriver', AdminRoleController.assignOrderToDriver);

export default router;