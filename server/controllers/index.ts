import * as express from "express";
import {AuthController} from "./AuthController";
import {UserController} from "./UserController";
import { AddressController } from "./AddressController";
import { ArtikelController } from "./ArtikelController";
import { ArtikelCategoryController } from "./ArtikelCategoryController";
import { ProductCategoryController } from "./ProductCategoryController";
import { ProductModelController } from "./ProductModelController";
import { ProductController } from "./ProductController";
import { OrderController } from "./OrderController";
import { OrderItemController } from "./OrderItemController";

export class Controller {

    public static initializeControllers(app: express.Express) {
        app.use('/oauth', new AuthController().router);
        app.use('/users', new UserController().router);
        app.use('/addresses', new AddressController().router);
        app.use('/artikels', new ArtikelController().router);
        app.use('/artikelCategories', new ArtikelCategoryController().router);
        app.use('/productCategories', new ProductCategoryController().router);
        app.use('/productModels', new ProductModelController().router);
        app.use('/products', new ProductController().router);
        app.use('/orders', new OrderController().router);
        app.use('/orderItems', new OrderItemController().router);
    }
}
