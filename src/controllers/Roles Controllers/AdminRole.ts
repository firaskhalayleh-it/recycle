import { Request, Response } from "express";
import { User } from "../../DataBase/entities/user";
import { Product } from "../../DataBase/entities/product";
import { Order } from "../../DataBase/entities/order";
import { OrderItems } from "../../DataBase/entities/order_items";
import { ROLES, Roles } from "../../DataBase/entities/Roles";

export class AdminRoleController {
    static getTotalUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.status(200).json(users.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getTotalProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.find();
            res.status(200).json(products.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getTotalOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getTotalOrdersPending = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find({ where: { status: 'pending' } });
            res.status(200).json(orders.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getOrdersNotDelivered = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find({ where: { status: 'not delivered' } });
            res.status(200).json(orders.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getProductsOutOfStock = async (req: Request, res: Response) => {
        try {
            const products = await Product.find({ where: { quantity: 0 } });
            res.status(200).json(products.length);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getProductsPerOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find({ relations: ['product'] });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static assignDeleryBoy = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            if (!username) {
                res.status(400).json({ message: 'username is required' });
            }


        } catch (error) {
            res.status(500).json(error);
        }
    }

    static assignAdminRole = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            const { Admin } = req.body.Admin;


            if (!username) {
                res.status(400).json({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                res.status(404).json({ message: 'user not found' });
            }
            const AdminUSR = await User.findOne({ where: { username: Admin } });
            if(!AdminUSR){
                res.status(404).json({message:'user not found'});
            }else{
            const role = await Roles.findOne({ where: { name: ROLES.ADMIN } });
            if (user) {
                if (!role) {
                    const role = new Roles();
                    role.name = ROLES.ADMIN;
                    AdminUSR.role = role;
                    await Roles.save(role);
                }
                if (role) {
                    role.name = ROLES.ADMIN;
                    user.role = role;
                    await Roles.save(role);
                    res.status(200).json({ message: 'role assigned successfully' });
                }
                user.save();
            }}
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }
    static assignSellerRole = async (req: Request, res: Response) => {
        try {
            const { username } = req.cookies.username;
            const { Seller } = req.body.Seller;
            if (!username) {
                return res.status(400).send({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            const SellerUSR = await User.findOne({ where: { username: Seller } });
            if (!SellerUSR) {
                return res.status(404).send({ message: 'user not found' });
            }
            const Adminrole = await Roles.findOne({ where: { name: ROLES.ADMIN } });
            if (!Adminrole) {
                return res.status(404).send({ message: 'you are not admin!' });
            }
            const role = await Roles.findOne({ where: { name: ROLES.SELLER } });
            if (!role) {
                const role = new Roles();
                role.name = ROLES.SELLER;
                SellerUSR.role = role;
                await role.save();
            } else {
                role.name = ROLES.SELLER;
                SellerUSR.role = role;
                await role.save();

            }

            SellerUSR.save();


            res.send('Role assigned successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static assignDriverRole = async (req: Request, res: Response) => {
        try {
            const { username } = req.cookies.username;
            const { Driver } = req.body.Driver;
            if (!username) {
                return res.status(400).send({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            const DriverUSR = await User.findOne({ where: { username: Driver } });
            if (!DriverUSR) {
                return res.status(404).send({ message: 'user not found' });
            }
            const Adminrole = await Roles.findOne({ where: { name: ROLES.ADMIN } });
            if (!Adminrole) {
                return res.status(404).send({ message: 'you are not admin!' });
            }
            const role = await Roles.findOne({ where: { name: ROLES.SELLER } });

            if (!role) {
                const role = new Roles();
                role.name = ROLES.DRIVER;
                DriverUSR.role = role;
                await role.save();
            } else {
                role.name = ROLES.DRIVER;
                DriverUSR.role = role;
                await role.save();

            }

            DriverUSR.save();

            res.send('Role assigned successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    }

    

}

