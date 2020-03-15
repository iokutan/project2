import * as express from "express";
import {ArtikelCategory} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ArtikelCategoryController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const artikels = await ArtikelCategory.findAll<ArtikelCategory>();
            res.json(artikels);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const category = await ArtikelCategory
                  .findOne<ArtikelCategory>({
                      where: { category_id: req.params.categoryId },
                    });
            if(category){
                res.status(201).send(category);
            } else {
                res.status(404).send("category not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var artikelCategory = await ArtikelCategory.build(req.body);
            const errors = await artikelCategory.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await artikelCategory.save();
                res.status(201).send(artikelCategory);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const artikelCategory = await ArtikelCategory.findOne<ArtikelCategory>({where: { category_id: req.params.categoryId }});
            if(artikelCategory){
                await artikelCategory.updateAttributes(req.body);
                res.status(201).send(artikelCategory);
            } else {
                res.status(404).send("artikelCategory not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const artikelCategory = await ArtikelCategory.findOne<ArtikelCategory>({where: { category_id: req.params.categoryId }});
          if(artikelCategory) {
            await artikelCategory.destroy();
            res.status(201).send(artikelCategory);
          }else {
            res.status(404).send("artikelCategory not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:categoryId", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:categoryId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:categoryId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
