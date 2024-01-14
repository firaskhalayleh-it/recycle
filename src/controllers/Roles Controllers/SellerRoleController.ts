import { ROLES, Roles } from "../../DataBase/entities/Roles";
import { Product } from "../../DataBase/entities/product";
import { User } from "../../DataBase/entities/user";
import { Request, Response } from 'express';
export class SellerController {
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

    static showAllSales = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            if(!username){
                return res.status(400).send({message:'you must login first'});
            }
            const user = await User.find({ where: { role: { name: ROLES.SELLER } } });
            if(!user){
                return res.status(404).send({message:'User not found'});
            }
            const products = await Product.find({ where: { provider: { username: username } } });
            if(!products){
                return res.status(404).send({message:'Products not found'});
            }
            
            res.status(200).json({
                user:user,
                products:products.map(product=>{
                   return `product name: ${product.name} , product saled quantity: ${product.saledQuantity()}`
                })
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}