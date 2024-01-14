import express from 'express';

import { DriverRoleController } from '../../controllers/Roles Controllers/DriverRole';

const router = express.Router();

router.get('/driver/orders', DriverRoleController.viewAssignedOrders);

export default router;