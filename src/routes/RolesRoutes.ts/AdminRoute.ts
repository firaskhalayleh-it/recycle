import { AdminRoleController } from "../../controllers/Roles Controllers/AdminRole";
import { Router } from "express";

const router = Router();

router.post('/admin', AdminRoleController.assignAdminRole);

export default router;