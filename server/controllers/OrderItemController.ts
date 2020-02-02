import * as express from "express";
import {OrderItem} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';

export class OrderItemController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orders = await OrderItem.findAll<OrderItem>();
            res.json(orders);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var order = await OrderItem.build(req.body);
            const errors = await order.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await order.save();
                res.status(201).send(order);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await OrderItem.findOne<OrderItem>({where: { orderItem_id: req.params.orderItemId }});
            if(order){
                await order.updateAttributes(req.body);
                res.status(201).send(order);
            } else {
                res.status(404).send("OrderItem not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const order = await OrderItem.findOne<OrderItem>({where: { orderItem_id: req.params.orderItemId }});
          if(order) {
            await order.destroy();
            res.status(201).send(order);
          }else {
            res.status(404).send("OrderItem not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:orderItemId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:orderItemId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
