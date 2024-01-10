import express from 'express';
import { UserAddressController } from '../../controllers/User Management/UserAddressController';
const router = express.Router();

router.get('/addresses', UserAddressController.getUserAddresses);

router.get('/addresses', UserAddressController.getUserAddressByUsername);

router.post('/addresses', UserAddressController.createUserAddress);

router.put('/addresses', UserAddressController.updateUserAddress);


export default router;
