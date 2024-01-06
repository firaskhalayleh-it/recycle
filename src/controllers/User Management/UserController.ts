import express, { request } from 'express';
import { User } from '../../DataBase/entities/user';
import { ROLES, Roles } from '../../DataBase/entities/Roles';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { Product } from '../../DataBase/entities/product';


export class UserController {
    static async getAllUsers(req: express.Request, res: express.Response) {

        try {
            const users = await User.find();
            if (users.length === 0) {
                res.send('no users found');
            } else {

                res.send(users);
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async getUserByUsername(req: express.Request, res: express.Response) {
        try {
            const user = await User.findOne({ where: { username: req.params.username } });
            res.send(user);
        }
        catch (error) {
            res.send(error);
        }
    }

    static async createUser(req: express.Request, res: express.Response) {
        try {
            const { username, password, confirm_password, first_name, last_name, email, telephone } = req.body;

            // Validate email
            if (!validator.isEmail(email)) {
                return res.status(400).send({ message: 'Invalid email address.' });
            }

            // Validate password (example: at least 8 characters)
            if (!password || password.length < 8) {
                return res.status(400).send({ message: 'Password must be at least 8 characters long.' });
            }
            if (password !== confirm_password) {
                return res.status(400).send({ message: 'Password must match.' });
            }
            if (password === req.body.username) {
                return res.status(400).send({ message: 'Password must be different from username.' });
            }

            // Validate telephone (basic example, consider a more robust validation)
            if (!validator.isMobilePhone(telephone)) {
                return res.status(400).send({ message: 'Invalid telephone number.' });
            }


            const user = new User();
            user.username = username;
            user.password = password;
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.telephone = telephone;
            const role = await Roles.findOne({ where: { name: ROLES.USER } });
            if (!role) {
                const newRole = new Roles();
                newRole.name = ROLES.USER;
                await Roles.save(newRole);
                user.role = newRole;
            } else if (role) {
                user.role = role;
                user.role.name = ROLES.USER;
            }
            await User.save(user);

            user.password = 'sensitive data';

            res.status(201).send(user);

        } catch (error) {
            res.status(500).send({ message: 'Error creating user', error });
        }
    }

    static async updateUser(req: express.Request, res: express.Response) {
        try {
            const user = await User.findOne({ where: { username: req.params.username } });
            if (user) {
                Object.assign(user, req.body);
                await user.save();
                res.send(user);
            }
            else {
                res.send('user not found');
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async deleteUser(req: express.Request, res: express.Response) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ where: { username: username } });
            if (user) {
                await User.remove(user);
                res.status(200).send({ message: 'User deleted successfully' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error deleting user', error });
        }
    }


    static async Login(req: express.Request, res: express.Response) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ 
                where: { username: username },
                relations: ['role'] // Ensure that the role is loaded
            });
    
            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: 'Incorrect password.' });
            }
    
            // Check if role and its name property are defined
            if (!user.role || !user.role.name) {
                return res.status(500).send({ message: 'User role is not defined.' });
            }
    
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role.name },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '15m' }
            );
    
            res.cookie('username', username, { httpOnly: true, secure: true, sameSite: 'none' });
            res.send({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).send({ message: 'Error during login.' });
        }
    }
    

    static Logout(req: express.Request, res: express.Response) {
        try {
            res.clearCookie('username');
            res.send('logged out');
        } catch (error) {
            res.send(error);
        }
    }

    static async UserProducts(req: express.Request, res: express.Response) {
        try {
            const username = req.cookies.username;
            if (!username) {
                return res.status(400).send({ message: 'Please provide a username' });
            }
    
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
    
            // Use query builder to handle relation
            const products = await Product.createQueryBuilder("product")
                .leftJoinAndSelect("product.provider", "provider")
                .where("provider.id = :id", { id: user.id })
                .getMany();
            
        
            if (products.length === 0) {
                return res.status(404).send({ message: 'No products found' });
            }
    

            res.send(products);
        } catch (error) {
            console.error('Error in UserProducts:', error);
            res.status(500).send({ message: 'Error retrieving products' });
        }
    }
    

}

