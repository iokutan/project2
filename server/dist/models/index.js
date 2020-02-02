"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const AccessToken_1 = require("./entities/AccessToken");
const User_1 = require("./entities/User");
const Product_1 = require("./entities/Product");
const ProductCategory_1 = require("./entities/ProductCategory");
const ProductModel_1 = require("./entities/ProductModel");
const Artikel_1 = require("./entities/Artikel");
const ArtikelCategory_1 = require("./entities/ArtikelCategory");
const Address_1 = require("./entities/Address");
const Order_1 = require("./entities/Order");
const OrderItem_1 = require("./entities/OrderItem");
var sequelize_typescript_2 = require("sequelize-typescript");
exports.Sequelize = sequelize_typescript_2.Sequelize;
var AccessToken_2 = require("./entities/AccessToken");
exports.AccessToken = AccessToken_2.AccessToken;
var User_2 = require("./entities/User");
exports.User = User_2.User;
var Address_2 = require("./entities/Address");
exports.Address = Address_2.Address;
var Artikel_2 = require("./entities/Artikel");
exports.Artikel = Artikel_2.Artikel;
var ArtikelCategory_2 = require("./entities/ArtikelCategory");
exports.ArtikelCategory = ArtikelCategory_2.ArtikelCategory;
var Product_2 = require("./entities/Product");
exports.Product = Product_2.Product;
var ProductCategory_2 = require("./entities/ProductCategory");
exports.ProductCategory = ProductCategory_2.ProductCategory;
var ProductModel_2 = require("./entities/ProductModel");
exports.ProductModel = ProductModel_2.ProductModel;
var Order_2 = require("./entities/Order");
exports.Order = Order_2.Order;
var OrderItem_2 = require("./entities/OrderItem");
exports.OrderItem = OrderItem_2.OrderItem;
/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */
class Models {
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    initModels() {
        this.sequelize.addModels(this.getModels());
        return this.sequelize.sync({ force: false });
    }
    getModels() {
        return [
            AccessToken_1.AccessToken, User_1.User, Product_1.Product, ProductCategory_1.ProductCategory, ProductModel_1.ProductModel,
            Artikel_1.Artikel, ArtikelCategory_1.ArtikelCategory, Address_1.Address, Order_1.Order, OrderItem_1.OrderItem
        ];
    }
}
exports.Models = Models;
//# sourceMappingURL=index.js.map