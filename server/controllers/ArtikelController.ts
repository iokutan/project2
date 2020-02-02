import * as express from "express";
import {Artikel} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class ArtikelController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const artikels = await Artikel.findAll<Artikel>();
            res.json(artikels);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var artikel = await Artikel.build(req.body);
            const errors = await artikel.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await artikel.save();
                res.status(201).send(artikel);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const address = await Artikel.findOne<Artikel>({where: { artikel_id: req.params.artikelId }});
            if(address){
                await address.updateAttributes(req.body);
                res.status(201).send(address);
            } else {
                res.status(404).send("artikel not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const address = await Artikel.findOne<Artikel>({where: { artikel_id: req.params.artikelId }});
          if(address) {
            await address.destroy();
            res.status(201).send(address);
          }else {
            res.status(404).send("artikel not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/:categoryId", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:artikelId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:artikelId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
