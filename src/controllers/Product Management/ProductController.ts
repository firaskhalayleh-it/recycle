import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Product } from '../../DataBase/entities/product';
import { ProductCategory, productCategory } from '../../DataBase/entities/product_category';


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

    static createProduct = async (req: express.Request, res: express.Response) => {
        try {
            const { name, description, price, quantity } = req.body;
            const uploaded = req.file;
            const product = new Product();
            if (name && description && price && quantity && uploaded) {
                product.name = name;
                const fileToUpload = fs.readFileSync(uploaded.path);
                const encodedFile = fileToUpload.toString('base64');
                const file = Buffer.from(encodedFile, 'base64');
                product.image = file;
                product.description = description;
                product.price = price;
                product.quantity = quantity;
            }
            else {
                return res.status(400).send({ message: 'Invalid data' });
            }

            if (description.includes('wood')) {
                const category = await ProductCategory.findOne({ where: { name: 'wood' } });

                if (!category) {
                    res.send('category not found');
                } else if (category) {
                    product.category = category;
                }
                await product.save();
            }
            else if (description.includes('metal')) {
                const category = await ProductCategory.findOne({ where: { name: 'metal' } });
                if (!category) {
                    res.send('category not found');
                } else if (category) {
                    product.category = category;
                }
                await product.save();
            }
            else if (description.includes('plastic')) {
                const category = await ProductCategory.findOne({ where: { name: 'plastic' } });

                if (!category) {
                    res.send('category not found');
                } else if (category) {
                    product.category = category;
                }
                await product.save();
            }
            else if (description.includes('glass')) {
                const category = await ProductCategory.findOne({ where: { name: 'glass' } });
                if (!category) {
                    res.send('category not found');
                } else if (category) {
                    product.category = category;
                }
                await product.save();
            }
            else {
                const category = await ProductCategory.findOne({ where: { name: 'other' } });
                if (!category) {
                    res.send('category not found');
                } else if (category) {
                    product.category = category;
                }
                await product.save();
            }



            await Product.save(product);
            res.send(product);
        } catch (error) {
            res.send(error);
        }
    }

    static updateProduct = async (req: express.Request, res: express.Response) => {
        try {
            const product = await Product.findOne({ where: { name: req.params.name } });
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            Object.assign(product, req.body);
            await product.save();
            res.send(product);
        } catch (error) {
            res.send(error);
        }
    }

    static deleteProduct = async (req: express.Request, res: express.Response) => {
        try {
            const product = await Product.findOne({ where: { name: req.params.name } });
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