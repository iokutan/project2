import * as express from "express";
import {ProductCategory, ProductModel} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ProductCategoryController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productCategories = await ProductCategory.findAll<ProductCategory>();
            res.json(productCategories);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const product = await ProductCategory
                  .findOne<ProductCategory>({where: { category_id: req.params.category_id }});
            if(product){
                res.status(201).send(product);
            } else {
                res.status(404).send("ProductCategory not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var productCategorie = await ProductCategory.build(req.body);
            const errors = await productCategorie.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await productCategorie.save();
                res.status(201).send(productCategorie);
            }
        } catch (error) {
            if(error.errors)
                return res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productCategorie = await ProductCategory.findOne<ProductCategory>({where: { category_id: req.params.category_id }});
            if(productCategorie){
                await productCategorie.update(req.body);
                res.status(201).send(productCategorie);
            } else {
                res.status(404).send("ProductCategory not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productModelCategory = await ProductModel
          .findOne<ProductModel>({where: { category_id: req.params.category_id }});
            if(productModelCategory){
                return res.status(401).send("Can not be deleted, has Child Models");
            }
          const productCategorie = await ProductCategory
          .findOne<ProductCategory>({where: { category_id: req.params.category_id }});
          if(productCategorie) {
            await productCategorie.destroy();
            res.status(201).send(productCategorie);
          }else {
            res.status(404).send("ProductCategory not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.get("/:category_id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.delete("/:category_id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:category_id", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
