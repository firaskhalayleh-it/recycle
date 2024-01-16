import { Request, Response } from "express";
import { Drivers } from "../../DataBase/entities/Drivers";
import { Order } from "../../DataBase/entities/order";
import { User } from "../../DataBase/entities/user";
import { OrderItems } from "../../DataBase/entities/order_items";

export class DriverRoleController {


    static viewAssignedOrders = async (req: Request, res: Response) => {
        try {
            const driverUSR = req.cookies.username;
            if (!driverUSR) {
                return res.status(400).json({ message: "You must log in first!" });
            }
            const user  = await User.findOne({where:{username:driverUSR}});
            if(!user){  
                return res.status(404).json({message:'User not found'});
            }
           
            const driver = await Drivers.findOne({ where: { user: { username: user.username } } });
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }
           
            const orderitems = await OrderItems.find({ where: { driver: { id: driver.id } } });


           

            return res.status(200).json(orderitems);
        } catch (error) {
            return res.status(500).json({ message: error });
            console.log(error);
        }
    };
}