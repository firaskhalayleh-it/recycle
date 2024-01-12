import { Request, Response } from 'express';
import { User } from '../../DataBase/entities/user';
import { Product } from '../../DataBase/entities/product';
import { Roles, ROLES } from '../../DataBase/entities/Roles';
import { Discount } from '../../DataBase/entities/discount';

class DiscountController {
    async validateDiscount(req: Request, res: Response) {
        const username = req.cookies.username;

        const discount_percent = req.body.discount;
        if (!username) {
            return res.status(400).send({ message: 'you must login first!' });
        }

        const product = await Product.findOne({ where: { provider: username } });
        if (!product) {
            return res.status(404).send({ message: 'product not found' });
        }
        if (!await this.isProductOwnedByUser(username, product)) {
            return res.status(400).send('User does not own the product.');
        }

        if (!await this.isUserSeller(username)) {
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




        res.send('Discount validated successfully.');
    }

    private async isProductOwnedByUser(user: User, product: Product) {
        const isPorvider = await Product.findOne({ where: { provider: { username: user.username } } });
        if (!isPorvider) {
            return false;
        }
        else {
            if (isPorvider.id === product.id) {
                if (await this.isUserSeller(user)) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        }

    }

    private async isUserSeller(user: User) {
        if (user.role.name === ROLES.SELLER) {

            return true; 
        }
        else {
            return false;
        }
    }
}

export default new DiscountController();
