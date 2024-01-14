import { Request,Response } from "express";
import { User } from "../../DataBase/entities/user";
import { Product } from "../../DataBase/entities/product";
import { Order } from "../../DataBase/entities/order";
import { OrderItems } from "../../DataBase/entities/order_items";
import { ROLES, Roles } from "../../DataBase/entities/Roles";

export class AdminRoleController{
    static getTotalUsers = async (req:Request,res:Response)=>{
        try{
            const users = await User.find();
            res.status(200).json(users.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getTotalProducts = async (req:Request,res:Response)=>{
        try{
            const products = await Product.find();
            res.status(200).json(products.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getTotalOrders = async (req:Request,res:Response)=>{
        try{
            const orders = await Order.find();
            res.status(200).json(orders.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getTotalOrdersPending = async (req:Request,res:Response)=>{
        try{
            const orders = await Order.find({where:{status:'pending'}});
            res.status(200).json(orders.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getOrdersNotDelivered = async (req:Request,res:Response)=>{
        try{
            const orders = await Order.find({where:{status:'not delivered'}});
            res.status(200).json(orders.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getProductsOutOfStock = async (req:Request,res:Response)=>{
        try{
            const products = await Product.find({where:{quantity:0}});
            res.status(200).json(products.length);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static getProductsPerOrders = async (req:Request,res:Response)=>{
        try{
            const orders = await Order.find({relations:['product']});
            res.status(200).json(orders);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static assignDeleryBoy = async (req:Request,res:Response)=>{
        try{
           const {username} = req.body;
           if(!username){
               res.status(400).json({message:'username is required'});
           }


        }catch(error){
            res.status(500).json(error);
        }
    }

    static assignAdminRole = async (req:Request,res:Response)=>{    
        try{
            const username = req.cookies.username;
            if(!username){
                res.status(400).json({message:'username is required'});
            }
            const user = await User.findOne({where:{username:username}});
            if(!user){
                res.status(404).json({message:'user not found'});
            }
            if(user){
                const role = await Roles.findOne({where:{name:ROLES.ADMIN}});
                if(!role){
                    const role = new Roles();
                    role.name = ROLES.ADMIN;
                    user.role = role;
                    await Roles.save(role);
                }
                if(role){
                    role.name = ROLES.ADMIN;
                    user.role = role;
                    await Roles.save(role);
                    res.status(200).json({message:'role assigned successfully'});
                }
                user.save();
            }
        }catch(error){
            res.status(500).json(error);
            console.log(error);
        }
    }
    static assignSellerRole = async (req: Request, res: Response) => {
        try {
            const { username } = req.cookies.username;
            if (!username) {
                return res.status(400).send({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            const role = await Roles.findOne({ where: { name: ROLES.SELLER } });
            if (!role) {
                const role = new Roles();
                role.name = ROLES.SELLER;
                user.role = role;
                await role.save();
            }else{
                role.name = ROLES.SELLER;
                user.role = role;
                await role.save();
            
            }

            user.save();    
            

            res.send('Role assigned successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
