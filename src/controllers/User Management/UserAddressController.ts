import express from 'express';
import NodeGeocoder from 'node-geocoder';
import { UserAddress } from '../../DataBase/entities/user_address';
import { User } from '../../DataBase/entities/user';
import { Not } from 'typeorm';

const app = express();

export class UserAddressController {
    static async getUserAddresses(req: express.Request, res: express.Response) {
        try {
            const userAddress = await UserAddress.find();
            res.send(userAddress);
        } catch (error) {
            res.send(error);
        }
    }
    static async getUserAddressByUsername(req: express.Request, res: express.Response) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ where: { username: username }, relations: ['userAddress'] });

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const userAddress = user.userAddress;
            if (!userAddress) {
                return res.status(404).send({ message: 'User address not found' });
            }

            res.send(userAddress);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving user address', error });
        }
    }

 


    static async createUserAddress(req: express.Request, res: express.Response) {
        try {
            const { username, latitude, longitude, address, city, country, telephone, mobile } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const userAddress = new UserAddress();

            if (latitude && longitude) {
                const geocoder = NodeGeocoder({ provider: 'openstreetmap' }); // Or your chosen provider
                const geoResponse = await geocoder.reverse({ lat: latitude, lon: longitude });
                const geoAddress = geoResponse[0];
                if(geoAddress.streetName && geoAddress.city && geoAddress.country){
                userAddress.address = geoAddress.streetName;  
                userAddress.city = geoAddress.city;          
                userAddress.country = geoAddress.country;  
                }else{
                    return res.status(400).send({ message: 'Invalid location' });
                }
            } else if (address && city && country) {
                userAddress.address = address;
                userAddress.city = city;
                userAddress.country = country;
            } else {
                return res.status(400).send({ message: 'Insufficient address data' });
            }

            
            userAddress.user = user;

            await userAddress.save();
            res.send(userAddress);
        } catch (error) {
            res.status(500).send({ message: 'Error creating user address', error });
        }
    }

    static async updateUserAddress(req: express.Request, res: express.Response) {
        try {
            const { username, latitude, longitude, address, city, country, telephone, mobile } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const userAddress = user.userAddress;

            if (latitude && longitude) {
                const geocoder = NodeGeocoder({ provider: 'google' }); 
                const geoResponse = await geocoder.reverse({ lat: latitude, lon: longitude });
                const geoAddress = geoResponse[0];
                if(geoAddress.streetName && geoAddress.city && geoAddress.country){
                userAddress.address = geoAddress.streetName;
                userAddress.city = geoAddress.city;
                userAddress.country = geoAddress.country;
                }else{
                    return res.status(400).send({ message: 'Invalid location' });
                }
            } else if (address && city && country) {
                // Manually entered address
                userAddress.address = address;
                userAddress.city = city;
                userAddress.country = country;
            } else {
                return res.status(400).send({ message: 'Insufficient address data' });
            }

            await userAddress.save();
            res.send(userAddress);
        } catch (error) {
            res.status(500).send({ message: 'Error updating user address', error });
        }
    }
    
    static async deleteUserAddress(req: express.Request, res: express.Response) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ where: { username: username } });

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const userAddress = user.userAddress;
            if (!userAddress) {
                return res.status(404).send({ message: 'User address not found' });
            }

            await UserAddress.remove(userAddress);
            res.status(200).send({ message: 'User address deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error deleting user address', error });
        }
    }
}

    
