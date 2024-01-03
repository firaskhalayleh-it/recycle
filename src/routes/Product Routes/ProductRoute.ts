import express from 'express';
import { ProductController } from '../../controllers/Product Controller/productcontroller.js'; // Adjust the path as necessary
import multer from 'multer';
import path from 'path';

// Setup for multer (file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists or create it
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// Get all products
router.get('/products', ProductController.getAllProducts);

// Get product by name
router.get('/products/:name', ProductController.getProductByName);

// Create a new product
router.post('/products', upload.single('image'), ProductController.createProduct);

// Update a product
router.put('/products/:name', ProductController.updateProduct);

// Delete a product
router.delete('/products/:name', ProductController.deleteProduct);

export default router;
