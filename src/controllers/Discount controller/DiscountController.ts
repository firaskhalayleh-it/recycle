import { Request, Response } from 'express';
import { User } from '../../DataBase/entities/user';
import { Product } from '../../DataBase/entities/product';
import { Roles, ROLES } from '../../DataBase/entities/Roles';
import { Discount } from '../../DataBase/entities/discount';

class DiscountController {
    static async AddDiscount(req: Request, res: Response) {
        const username = req.cookies.username;

        const discount_percent = req.body.discount;
        if (!username) {
            return res.status(400).send({ message: 'you must login first!' });
        }
        if (!discount_percent) {
            return res.status(400).send({ message: 'discount is required' });
        }
        if (discount_percent < 0 || discount_percent > 100) {
            return res.status(400).send({ message: 'discount must be between 0 and 100' });
        }
        const product = await Product.findOne({ where: { provider: {username:username} } });
        const isSeller = await User.findOne({ where: {  role: {name:ROLES.SELLER} } });
        const isUser = await User.findOne({ where: { username: username } });
        
        if (!product) {
            return res.status(404).send({ message: 'product not found' });
        }
        if (!isUser) {
            return res.status(404).send({ message: 'user not found' });
        }
        

        if (!isSeller) {
            return res.status(403).send('User is not a seller.');
        }

        const discount = new Discount();
        discount.product = product;
        discount.discount_percent = discount_percent;
        discount.active = true;
        discount.start_date = new Date();
        discount.end_date = new Date();
        discount.end_date.setDate(discount.end_date.getDate() + 7);
        await Discount.save(discount);

        res.send('Discount signed successfully.');
    }

    
}


export  {DiscountController};