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
            const result = await OrderItem.bulkCreate(req.body);
            res.status(201).send(result);
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orders = await OrderItem.destroy({
                where: { order_id: req.params.orderId 
            }});
            console.log('ASGFAEFAWEFAWEF', orders);
            const orderItems = await OrderItem.bulkCreate(req.body);
            if(orderItems){
                res.status(201).send({});
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
        this.router.put("/:orderId", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
