import express from 'express';
import { ProductController } from '../../controllers/Product Controller/productcontroller'; 
import { upload } from '../../middlewares/multerConfig';


const router = express.Router();

// Get all products
router.get('/products', ProductController.getAllProducts);

// Get product by name
router.get('/products/:name', ProductController.getProductByName);

// Create a new product
router.post('/products', upload.single('image'), ProductController.createProduct);

// Delete a product
router.delete('/products', ProductController.deleteProduct);

export default router;
