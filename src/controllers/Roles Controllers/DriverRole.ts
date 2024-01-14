import { Request, Response } from "express";
import { Drivers } from "../../DataBase/entities/Drivers";
import { Order } from "../../DataBase/entities/order";

export class DriverRoleController {


    static viewAssignedOrders = async (req: Request, res: Response) => {
        try {
            const driverUSR = req.cookies.username;
            if (!driverUSR) {
                return res.status(400).json({ message: "You must log in first!" });
            }
            const driver = await Drivers.findOne({ where: { user: { username: driverUSR } }, relations: ["orderItems"] });
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            return res.status(200).json(driver.orderitems);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };
}