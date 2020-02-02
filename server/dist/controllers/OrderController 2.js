"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const auth_1 = require("../auth/auth");
const BaseController_1 = require("./BaseController");
class OrderController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield models_1.Order.findAll();
                res.json(orders);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield models_1.Order.findOne({
                    where: { order_id: req.params.order_id },
                    include: [
                        {
                            model: models_1.User,
                            include: [models_1.Address]
                        },
                        {
                            model: models_1.OrderItem,
                            include: [
                                {
                                    model: models_1.Product,
                                    include: [
                                        {
                                            model: models_1.ProductModel,
                                            include: [models_1.ProductCategory]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
                if (order) {
                    res.status(201).send(order);
                }
                else {
                    res.status(404).send("Order not found");
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var order = yield models_1.Order.build(req.body);
                const errors = yield order.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield order.save();
                    res.status(201).send(order);
                }
            }
            catch (error) {
                if (error.errors)
                    res.status(400).send(error.errors.map(a => a.message));
                res.status(400).send(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield models_1.Order.findOne({ where: { order_id: req.params.order_id } });
                if (order) {
                    yield order.updateAttributes(req.body);
                    res.status(201).send(order);
                }
                else {
                    res.status(404).send("Order not found");
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield models_1.Order.findOne({ where: { order_id: req.params.order_id } });
                if (order) {
                    yield order.destroy();
                    res.status(201).send(order);
                }
                else {
                    res.status(404).send("Order not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:order_id", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:order_id", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:order_id", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map