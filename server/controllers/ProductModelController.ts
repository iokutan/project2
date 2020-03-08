import * as express from "express";
import {ProductModel, ProductCategory, Product} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ProductModelController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productCategories = await ProductModel.findAll<ProductModel>({
                include: [ProductCategory]
            });
            res.json(productCategories);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getByCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productModels = await ProductModel.findAll<ProductModel>({
                where: { category_id: req.params.category_id },
                include: [ProductCategory]
            });
            res.json(productModels);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const model = await ProductModel
                  .findOne<ProductModel>({where: { model_id: req.params.model_id }});
            if(model){
                res.status(201).send(model);
            } else {
                res.status(404).send("model not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var productCategorie = await ProductModel.build(req.body);
            const errors = await productCategorie.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await productCategorie.save();
                res.status(201).send(productCategorie);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productCategorie = await ProductModel.findOne<ProductModel>({where: { model_id: req.params.model_id }});
            if(productCategorie){
                await productCategorie.update(req.body);
                res.status(201).send(productCategorie);
            } else {
                res.status(404).send("ProductModel not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await Product
          .findOne<Product>({where: { category_id: req.params.model_id }});
            if(product){
                return res.status(401).send("Can not be deleted, has Child Products");
            }
          const productCategorie = await ProductModel.findOne<ProductModel>({where: { model_id: req.params.model_id }});
          if(productCategorie) {
            await productCategorie.destroy();
            res.status(201).send(productCategorie);
          }else {
            res.status(404).send("ProductModel not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:model_id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/byCategory/:category_id", Auth.getBearerMiddleware(), this.getByCategory.bind(this));
        this.router.post("/:category_id", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:model_id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:model_id", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
