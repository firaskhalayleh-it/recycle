import { ROLES, Roles } from "../../DataBase/entities/Roles";
import { User } from "../../DataBase/entities/user";
import { Request, Response } from 'express';
export class SellerController {
    static assignSellerRole = async (req: Request, res: Response) => {
        try {
            const { username } = req.cookies.username;
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