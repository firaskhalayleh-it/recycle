import express, { request } from 'express';
import { User } from '../../DataBase/entities/user';
import { ROLES } from '../../DataBase/entities/Roles';
import bcrypt from 'bcrypt';
export class UserController{
    static async getAllUsers(req: express.Request, res: express.Response){
        const {id, name,username, email, password} = req.params;

        try {
            const users = await User.find();
            res.send(users);
        } catch (error) {
            res.send(error);
        }
    }

    static async getUserById(req: express.Request, res: express.Response){
        try {
            const user = await User.findOne({where: {id: req.params.id}});
            res.send(user);
        }
        catch (error) {
            res.send(error);
        }
    }

    static async createUser(req: express.Request, res: express.Response){
        try {
            const user = await User.create(req.body);
            await user.save();
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    }

    static async updateUser(req: express.Request, res: express.Response){
        try{
            const user = await User.findOne({where: {username: req.params.username}});
            if(user){
                Object.assign(user, req.body);
                await user.save();
                res.send(user);
            }
            else{
                res.send('user not found');
            }
        }catch(error){
            res.send(error);
        }
    }

    static async deleteUser(req: express.Request, res: express.Response){
        try{
            const user = await User.findOne({where: {username : req.params.username}});
            if(user){
                await user.remove();
                res.send(user);
            }
            else{
                res.send('user not found');
            }
        }catch(error){
            res.send(error);
        }   }

    static async Login(req: express.Request, res: express.Response){
        try{
            const user = await User.findOne({where: {username: req.body.username}});
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    res.send(user);
                }
                else{
                    res.send('wrong password');
                }
            }
            else{
                res.send('user not found');
            }

        }catch(error){
            res.send(error);
        }

    }

}

