import { User } from "../../DataBase/entities/user";
import { UserPayment } from "../../DataBase/entities/user_payment";
import { Request, Response } from "express";

export class UserPaymentController {
    static getUserPayments = async (req: Request, res: Response) => {
        try {
            const userPayments = await UserPayment.find();
            res.status(200).json(userPayments);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getUserPaymentByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            if (!username) {
                return res.status(400).json({ message: 'username is required' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }

            const userPayment = await UserPayment.find({ where: { userId: user.id } });
            res.status(200).json(userPayment);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    static createUserPayment = async (req: Request, res: Response) => {
        try {
            const { username, card_number, provider, expire_date, cvv } = req.body;
            if (!username) {
                res.status(400).json({ message: 'username is required' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                res.status(404).json({ message: 'user not found' });
            }

            const userPayment = new UserPayment();
            if (user && card_number && provider && expire_date && cvv) {
                userPayment.userId = user.id;
                userPayment.card_number = card_number;
                userPayment.provider = provider;
                userPayment.expire_date = expire_date;
                userPayment.cvv = cvv;
            }
            const results = await UserPayment.save(userPayment);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static updateUserPayment = async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            if (!username) {
                res.status(400).json({ message: 'username is required' });
            }
            const user = await User.findOne({ where: { username: username }, relations: ['userPayment'] });
            if (!user) {
                res.status(404).json({ message: 'user not found' });
            }
            else if (user) {

                const userPayment = await UserPayment.findOne({ where: { userId: user.id } });
                if (!userPayment) {
                    res.status(404).json({ message: 'user payment not found' });
                } else {
                    Object.assign(userPayment, req.body);
                    await userPayment.save();
                    res.status(200).json(userPayment);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    
  
}