import * as express from "express";
import {ProductService, Product} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ProductServicesController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productServices = await ProductService.findAll<ProductService>({
                include: [
                    {
                        model: Product,
                    }
                ]
            });
            res.json(productServices);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getByProductId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productServices = await ProductService.findAll<ProductService>({
                where: { product_id: req.params.product_id},
                include: [ Product ]
            });
            res.json(productServices);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await ProductService
                  .findOne<ProductService>({where: { service_id: req.params.service_id }});
            if(product){
                res.status(201).send(product);
            } else {
                res.status(404).send("ProductService not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var productServic = await ProductService.build(req.body);
            const errors = await productServic.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await productServic.save();
                res.status(201).send(productServic);
            }
        } catch (error) {
            if(error.errors)
                return res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productServic = await ProductService
            .findOne<ProductService>({where: { service_id: req.params.service_id }});
            
            if(productServic){
                await productServic.update(req.body);
                res.status(201).send(productServic);
            } else {
                res.status(404).send("ProductCategory not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const productServic = await ProductService
          .findOne<ProductService>({where: { service_id: req.params.service_id }});
          if(productServic) {
            await productServic.destroy();
            res.status(201).send(productServic);
          }else {
            res.status(404).send("ProductService not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.get("/:service_id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/byProduct/:product_id", Auth.getBearerMiddleware(), this.getByProductId.bind(this));
        this.router.delete("/:service_id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:service_id", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
