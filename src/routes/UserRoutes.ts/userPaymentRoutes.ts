import express from 'express';
import { UserPaymentController } from '../../controllers/User Management/UserPaymentController';
const router = express.Router();

router.get('/user-payments', UserPaymentController.getUserPayments);


router.get('/user-payments/:username', UserPaymentController.getUserPaymentByUsername);

router.post('/user-payments', UserPaymentController.createUserPayment);

router.put('/user-payments/:username', UserPaymentController.updateUserPayment);

export default router;
