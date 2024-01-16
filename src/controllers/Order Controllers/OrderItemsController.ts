import { locales } from "validator/lib/isIBAN";
import { Order } from "../../DataBase/entities/order";
import { OrderItems } from "../../DataBase/entities/order_items";
import { User } from "../../DataBase/entities/user";
import { UserPayment } from "../../DataBase/entities/user_payment";
import { Request, Response } from "express";

export class OrderItemsController {
    static getOrdersByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            if (!username) {
                return res.status(400).send({ message: 'You must log in first!' });
            }

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const orders = await Order.find({
                where: { customer: { username: username }, status: 'pending' },
                relations: ['orderItems']
            });

            if (!orders.length) {
                return res.status(404).send({ message: 'No pending orders found' });
            }

            const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);

            const userPayment = await UserPayment.findOne({ where: { userId: { username: username } } });
            if (!userPayment) {
                return res.status(404).send({ message: 'User payment details not found' });
            }
            const isorderItems = await OrderItems.findOne({ where: { customer: { username: username } } });
            if (isorderItems) {
                res.status(200).send(isorderItems);
            }else {

                const orderItems = new OrderItems();
                orderItems.customer = user;
                orderItems.user_payment = userPayment;
                orderItems.total = total;
                orderItems.delevary_status = 'pending';
                orderItems.order = orders;
                await orderItems.save();
                res.status(200).send(orderItems);   
            }



        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching orders', error });
        }
    }

    static submitOrder = async (req: Request, res: Response) => {
        const username = req.cookies.username;
        try {
            if (!username) {
                return res.status(400).send({ message: 'You must log in first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            const orderItems = await Order.findOne({ where: { customer: { username: user.username }, status: 'pending' } });
            if (!orderItems) {
                return res.status(404).send({ message: 'No pending orders found' });
            }
            const orders = await Order.find({
                where: { customer: { username: username }, status: 'pending' },
                relations: ['orderItems']
            });
            orders.forEach(async (order) => {
                order.status = 'submitted';
                await order.save();
            });

            if (orders.length == 0) {
                return res.status(404).send({ message: 'No pending orders found' });
            }

            res.send ( orders );
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching orders', error });
        }

    }
}
