import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../../DataBase/entities/order';
import { Product } from '../../DataBase/entities/product';
import { UserPayment } from '../../DataBase/entities/user_payment';

export class OrderItemController {
    static getAllOrderItemsByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            const orderItems = await Order.find({ where: { customer: username } });
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static createOrderItemOrUpdate = async (req: Request, res: Response) => {
       
        try {
            const { product_name, quantity } = req.body;
            const username = req.cookies.username;
            if (!username || !product_name || !quantity) {
                return res.status(400).json({ message: ' product name, quantity are required' });
            }
            const userPayment = await UserPayment.findOne({ where: { userId:username } });
            if (!userPayment) {
                return res.status(404).json({ message: 'user payment not found' });
            }
            const product = await Product.findOne({ where: { name: product_name } });
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            const orderItem = await Order.findOne({ where: { customer: username, product: { name: product_name } } });
            if (orderItem) {
                orderItem.quantity = quantity;
                orderItem.payment_id = userPayment;
                await Order.save(orderItem);
                res.status(200).json(orderItem);
            } else {
                const newOrderItem = new Order();
                newOrderItem.customer = username;
                newOrderItem.product = product;
                newOrderItem.quantity = quantity;
                newOrderItem.payment_id = userPayment;
                await Order.save(newOrderItem);
                res.status(200).json(newOrderItem);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

   

    static deleteOrderItem = async (req: Request, res: Response) => {
        try {
            const { username } = req.cookies.username;
            if (!username) {
                return res.status(400).json({ message: 'please login first!' });
            }
            const orderItem = await Order.findOne({ where: { customer:username } });
            if (!orderItem) {
                return res.status(404).json({ message: 'order item not found' });
            }
            await Order.remove(orderItem);
            res.status(200).json({ message: 'order item deleted successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}