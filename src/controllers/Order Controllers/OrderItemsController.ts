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

            const orderItems = OrderItems.create({
                order: orders,
                customer: user,
                total: total,
                user_payment: userPayment
            });

            await orderItems.save();

            res.send(orderItems);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching orders', error });
        }
    }

    static submitOrder = async (req: Request, res: Response) => {
        const { username } = req.cookies;

        const orderItems = await Order.findOne({ where: { customer: { username: username }, status: 'pending' } });
        if(!orderItems) {
            return res.status(404).send({ message: 'No pending orders found' });
        }
        const orders = await Order.find({
            where: { customer: { username: username }, status: 'submited' },
            relations: ['orderItems']
        });

        if (!orders.length) {
            return res.status(404).send({ message: 'No pending orders found' });
        }

    }
}
