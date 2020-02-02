import * as express from "express";
import {Address} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class AddressController extends BaseController {

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const addresses = await Address.findAll<Address>(
                { where: { userId: req.params.userId } }
            );
            res.json(addresses);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const address = await Address.build(req.body);
            const errors = await address.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await address.save();
                res.status(201).send(address);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const address = await Address.findOne<Address>({where: { address_id: req.params.addressId }});
            if(address){
                await address.updateAttributes(req.body);
                res.status(201).send(address);
            } else {
                res.status(404).send("address not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const address = await Address.findOne<Address>({where: { address_id: req.params.addressId }});
          if(address) {
            await address.destroy();
            res.status(201).send(address);
          }else {
            res.status(404).send("address not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    private buildRoutes() {
        this.router.get("/:userId", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/:userId", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:addressId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:addressId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
