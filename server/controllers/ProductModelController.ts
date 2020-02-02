import * as express from "express";
import {ProductModel} from "../models";
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
            const productCategories = await ProductModel.findAll<ProductModel>();
            res.json(productCategories);
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
        this.router.post("/:category_id", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:model_id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:model_id", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
