import express from 'express';
import multer from 'multer';
import path from 'path';
import { Product } from '../../DataBase/entities/product';
import { ProductCategory } from '../../DataBase/entities/product_category';
import { User } from '../../DataBase/entities/user';
import { ROLES } from '../../DataBase/entities/Roles';







export class ProductController {
    static getAllProducts = async (req: express.Request, res: express.Response) => {
        try {
            const products = await Product.find();
            if (products.length === 0) {
                res.send('no products found');
            } else {
                res.send(products);
            }
        } catch (error) {
            res.send(error);
        }
    }

    static getProductByName = async (req: express.Request, res: express.Response) => {
        try {
            const product = await Product.findOne({ where: { name: req.params.name } });
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            res.send(product);
        } catch (error) {
            res.send(error);
        }
    }

    static getProductByID = async (req: express.Request, res: express.Response) => {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            res.send(product);
        } catch (error) {
            console.error('Error getting product:', error);
        }
    }

    static createProduct = async (req: express.Request, res: express.Response) => {
        try {
            const { name, description, price, quantity, provider } = req.body;
            const uploaded = req.file;

            if (!name || !description || !price || !quantity || !uploaded || !provider) {
                return res.status(400).send('Please fill all the fields and upload an image');
            }

            const product = new Product();
            product.name = name;
            product.image = uploaded.path;
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            product.original_quantity = quantity;
            const roleOfProvider = await User.findOne({ where: { username: provider } });
            if (!roleOfProvider) {
                res.status(404).send({ message: 'Provider not found' });
            }
            if (roleOfProvider) {

                product.provider = roleOfProvider;
            }


            const categories = ['wood', 'metal', 'plastic', 'glass', 'fabric', 'paper', 'stone', 'other'];
            let categoryNames = categories.filter(cat => description.includes(cat));

            if (categoryNames.length === 0) {
                categoryNames.push('other');
            }

            const categoryEntities = [];
            for (const categoryName of categoryNames) {
                let category = await ProductCategory.findOne({ where: { name: categoryName } });
                if (!category) {
                    category = new ProductCategory();
                    category.name = categoryName;
                    await category.save();
                }
                categoryEntities.push(category);
            }


            product.categories = categoryEntities;

            await product.save();
            console.log('Saved product:', product);

            res.status(200).send(product);
        } catch (error) {
            console.error('Error saving product:', error);
            res.status(500).send(error);
        }
    }



    static deleteProduct = async (req: express.Request, res: express.Response) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).send('Please provide a name');
            }
            const product = await Product.findOne({ where: { name: name } });
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            
            await Product.remove(product);
            res.status(200).send({ message: 'Product deleted successfully' });
        } catch (error) {
            res.send(error);
        }
    }

}