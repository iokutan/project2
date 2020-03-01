"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("./AuthController");
const UserController_1 = require("./UserController");
const AddressController_1 = require("./AddressController");
const ArtikelController_1 = require("./ArtikelController");
const ArtikelCategoryController_1 = require("./ArtikelCategoryController");
const ProductCategoryController_1 = require("./ProductCategoryController");
const ProductModelController_1 = require("./ProductModelController");
const ProductController_1 = require("./ProductController");
const OrderController_1 = require("./OrderController");
const OrderItemController_1 = require("./OrderItemController");
const ProductServicesController_1 = require("./ProductServicesController");
class Controller {
    static initializeControllers(app) {
        app.use('/oauth', new AuthController_1.AuthController().router);
        app.use('/users', new UserController_1.UserController().router);
        app.use('/addresses', new AddressController_1.AddressController().router);
        app.use('/artikels', new ArtikelController_1.ArtikelController().router);
        app.use('/artikelCategories', new ArtikelCategoryController_1.ArtikelCategoryController().router);
        app.use('/productCategories', new ProductCategoryController_1.ProductCategoryController().router);
        app.use('/productModels', new ProductModelController_1.ProductModelController().router);
        app.use('/productServices', new ProductServicesController_1.ProductServicesController().router);
        app.use('/products', new ProductController_1.ProductController().router);
        app.use('/orders', new OrderController_1.OrderController().router);
        app.use('/orderItems', new OrderItemController_1.OrderItemController().router);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=index.js.map