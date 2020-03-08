import * as express from "express";
import {Product, ProductModel, ProductCategory} from "../models";
import {Auth} from "../auth/auth";
import { v4 as uuidv4 } from 'uuid';
import {BaseController} from "./BaseController";
import * as _ from 'lodash';
import * as path from 'path';

export class ProductController extends BaseController{
    private uploadHandler: any;
    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const products = await Product.findAll<Product>({
                include: [
                    {
                        model: ProductModel,
                        include: [ProductCategory]
                    }
                ]
            });
            res.json(products);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getByModelId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const products = await Product.findAll<Product>({
                where: { category_id: req.params.model_id}
            });
            res.status(201).json(products);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await Product
                  .findOne<Product>({
                      where: { product_id: req.params.productId },
                      include: [
                            {
                                model: ProductModel,
                                include: [ProductCategory]
                            }
                        ]
                    });
            if(product){
                res.status(201).send(product);
            } else {
                res.status(404).send("product not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await Product.build(req.body);
            const errors = await product.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await product.save();
                res.status(201).send(product);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let product = await Product.findOne<Product>({
                where: { product_id: req.params.productId }
            });
            if(product){
                await product.update(req.body);
                product = await Product.findOne<Product>({
                    where: { product_id: req.params.productId },
                    include: [
                        {
                            model: ProductModel,
                            include: [ProductCategory]
                        }
                    ]
                });

                res.status(201).send(product);
            } else {
                res.status(404).send("product not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const product = await Product.findOne<Product>({where: { product_id: req.params.productId }});
          if(product) {
            await product.destroy();
            res.status(201).send(product);
          }else {
            res.status(404).send("artikel not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async uploadImage(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const imagePath = path.join(__dirname, '../../public/images/');
            if (!req.files) {
                return res.status(404).json({error: 'Please provide an image'});
            }

            let file = req.files['file'];
            const fileIdentifier = uuidv4();
            file.mv(`${imagePath}/${fileIdentifier}_${file.name}`);

            res.status(200).json({ name: file.name, imagePath: `${req.protocol}://${req.get('host')}/images/${fileIdentifier}_${file.name}` });
        } catch (error) {
            res.status(500).send(error); 
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:productId", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/byModel/:model_id", Auth.getBearerMiddleware(), this.getByModelId.bind(this));
        this.router.post("/create/:productId", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.post("/uploadImage", Auth.getBearerMiddleware(), this.uploadImage.bind(this));
        this.router.delete("/:productId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:productId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
