import express from 'express';
import { UserController } from '../../controllers/User Management/UserController'; 

const router = express.Router();

// Route to get all users
router.get('/users', UserController.getAllUsers);

// Route to get a single user by id
router.get('/users/:username', UserController.getUserByUsername);

// Route to create a new user
router.post('/users', UserController.createUser);

// Route to update a user by username
router.put('/users/:username', UserController.updateUser);

// Route to delete a user by username
router.delete('/users/:username', UserController.deleteUser);

// Route to login
router.post('/users/login', UserController.Login);

router.post('/users/logout', UserController.Logout);

router.post('/users/showProducts',UserController.UserProducts);


export default router;
