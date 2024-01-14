import { SellerController } from "../../controllers/Roles Controllers/SellerRoleController";
import { Router } from "express";

const router = Router();

router.post('/seller', SellerController.assignSellerRole);
router.post('/seller/showSales', SellerController.showAllSales);

export default router;