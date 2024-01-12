import { SellerController } from "../../controllers/Roles Controllers/SellerRoleController";
import { Router } from "express";

const router = Router();

router.post('/seller', SellerController.assignSellerRole);

export default router;