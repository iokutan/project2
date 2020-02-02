import * as express from "express";
import {Product} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ProductController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const products = await Product.findAll<Product>();
            res.json(products);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await Product
                  .findOne<Product>({where: { product_id: req.params.productId }});
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
            const product = await Product.findOne<Product>({where: { product_id: req.params.productId }});
            if(product){
                await product.updateAttributes(req.body);
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
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:productId", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/:productId", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:productId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:productId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
