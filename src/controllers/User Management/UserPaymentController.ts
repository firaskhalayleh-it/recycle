import { Order } from "../../DataBase/entities/order";
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

            const userPayment = await UserPayment.find({ where: { userId: {username : username} } });
            res.status(200).json(userPayment);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    static createUserPayment = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            const { card_number, provider, expire_date, cvv } = req.body;
            if (!username) {
                res.status(400).json({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                res.status(404).json({ message: 'user not found' });
            }

            if (user && card_number && provider && expire_date && cvv) {
                const userPayment = new UserPayment();
                userPayment.userId = user;
                userPayment.card_number = card_number;
                userPayment.provider = provider;
                userPayment.expire_date = expire_date;
                userPayment.cvv = cvv;
                await UserPayment.save(userPayment);
                res.status(200).send(userPayment);
            }else
            {
                res.status(400).json({ message: 'Invalid data' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static updateUserPayment = async (req: Request, res: Response) => {
        try {
            const username = req.cookies.username;
            if (!username) {
                res.status(400).json({ message: 'you must login first!' });
            }
            const user = await User.findOne({ where: { username: username }, relations: ['userPayment'] });
            if (!user) {
                res.status(404).json({ message: 'user not found' });
            }
            else if (user) {

                const userPayment = await UserPayment.findOne({ where: { userId: {username : username} } });
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