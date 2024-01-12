import express from 'express';
import DiscountController from '../../controllers/Discount controller/DiscountController';
const route = express.Router();

route.get('/discounts', DiscountController.AddDiscount);

export default route;