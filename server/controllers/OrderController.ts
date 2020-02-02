import * as express from "express";
import {Order, User, Address, OrderItem, ProductCategory, Product, ProductModel} from "../models";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";
import * as _ from 'lodash';
import { AddressController } from "./AddressController";

export class OrderController extends BaseController{

    constructor() {
        super();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orders = await Order.findAll<Order>();
            res.json(orders);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await Order.findOne<Order>(
                {
                    where: { order_id: req.params.order_id },
                    include: [
                        {
                           model: User,
                           include: [Address]
                        },
                        {
                          model: OrderItem,
                          include: [
                              {
                                  model: Product,
                                  include: [
                                        {
                                            model: ProductModel,
                                            include: [ProductCategory]
                                        }
                                    ]
                              }
                            ]
                        }
                    ]
            });
            if(order){
                res.status(201).send(order);
            } else {
                res.status(404).send("Order not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await Order.build(req.body);
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
            const order = await Order.findOne<Order>({where: { order_id: req.params.order_id }});
            if(order){
                await order.updateAttributes(req.body);
                res.status(201).send(order);
            } else {
                res.status(404).send("Order not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const order = await Order.findOne<Order>({where: { order_id: req.params.order_id }});
          if(order) {
            await order.destroy();
            res.status(201).send(order);
          }else {
            res.status(404).send("Order not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }
 
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:order_id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:order_id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:order_id", Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
