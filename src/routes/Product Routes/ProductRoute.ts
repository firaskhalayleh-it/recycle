import express from 'express';
import { ProductController } from '../../controllers/Product Controllers/ProductController'; 
import { upload } from '../../middlewares/multerConfig';



const router = express.Router();

// Get all products
router.get('/products', ProductController.getAllProducts);

// Get product by name
router.post('/products/:name', ProductController.getProductByName);

router.post('/products/search/:id', ProductController.getProductByID);

// Create a new product
router.post('/products', upload.single('image'), ProductController.createProduct);

// Delete a product
router.delete('/products', ProductController.deleteProduct);

export default router;
