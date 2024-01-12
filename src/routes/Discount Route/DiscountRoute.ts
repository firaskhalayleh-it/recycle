import express from 'express';
import {Request, Response} from 'express';
import {DiscountController} from '../../controllers/Discount controller/DiscountController';
const route = express.Router();

// In your route setup
route.post('/AddDiscount',DiscountController.AddDiscount);

export default route;