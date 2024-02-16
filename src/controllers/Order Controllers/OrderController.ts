import { Request, Response } from "express";
import { User } from "../../DataBase/entities/user";
import { Order } from "../../DataBase/entities/order";
import { Product } from "../../DataBase/entities/product";




export class OrderController {

    static getOrdersByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            if (!username) {
                return res.status(400).send({ message: 'username is required' }); // Add a return statement here
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'user not found' }); // Add a return statement here
            } else {
                const orders = await Order.find({ where: { customer: { id: user.id } } });
                if (orders.length === 0) {
                    return res.status(404).send({ message: 'orders not found' }); // Add a return statement here
                }
                return res.status(200).send(orders); // Add a return statement here
            }
        } catch (error) {
            return res.status(500).send(error); // Add a return statement here
        }
    }

    static createOrderItem = async (req: Request, res: Response) => {

        try {
            
            const { productName, quantity, username } = req.body;
            if (!username) {
                res.status(400).send({ message: 'username is required' });
            }
            const product = await Product.findOne({ where: { name: productName } });
            if (!product) {
                res.status(404).send({ message: 'product not found' });
            } else if (product) {

                if (product.quantity < quantity || product.quantity === 0) {
                    res.status(400).send({ message: 'not enough quantity or its out of stock' });
                }


                const user = await User.findOne({ where: { username: username } });
                if (user) {
                    
                        const orderItem = new Order();
            
                        orderItem.customer = user;
                        orderItem.product = product;
                        orderItem.quantity = quantity;
                        orderItem.total = product.price * quantity;
                        orderItem.status = 'pending';
                        product.quantity = product.quantity - quantity;
                        await Product.save(product);
                        await Order.save(orderItem);
                        res.cookie('order', orderItem.id);
                        res.status(200).send({ message: 'order created successfully' });
                       
                } else {
                    res.status(404).send({ message: 'user not found' });
                }

            }
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }

    }
    static updateOrderItem = async (req: Request, res: Response) => {
        try {
            const orderId = req.cookies.order;
            const { quantity, status } = req.body;
            if (!orderId) {
                res.status(400).send({ message: 'orderId is required' });
            }
            const order = await Order.findOne({
                where: { id: orderId },
                relations: ["product"]  // Include this line to load the product with the order
            });
            if (!order) {
                res.status(404).send({ message: 'order not found' });
            } else if (order) {
                order.updated_at = new Date();
                const oldquantity = order.quantity;
                order.quantity = quantity;
                order.product.quantity = order.product.quantity - quantity + oldquantity;
                order.total = order.product.price * quantity;

                await Product.save(order.product);


                order.status = status;



                await Order.save(order);
                res.status(200).send({ message: 'order updated successfully' });
            }
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    }
}