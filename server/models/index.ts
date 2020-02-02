import {Sequelize} from 'sequelize-typescript';
import {AccessToken} from "./entities/AccessToken";
import {User} from "./entities/User";
import {Product} from "./entities/Product";
import {ProductCategory} from "./entities/ProductCategory";
import {ProductModel} from "./entities/ProductModel";
import {Artikel} from "./entities/Artikel";
import {ArtikelCategory} from "./entities/ArtikelCategory";
import {Address} from "./entities/Address";
import {Order} from "./entities/Order";
import {OrderItem} from "./entities/OrderItem";

export {Sequelize} from 'sequelize-typescript';
export {AccessToken} from "./entities/AccessToken";
export {User} from "./entities/User";
export {Address} from "./entities/Address";
export {Artikel} from "./entities/Artikel";
export {ArtikelCategory} from "./entities/ArtikelCategory";
export {Product} from "./entities/Product";
export {ProductCategory} from "./entities/ProductCategory";
export {ProductModel} from "./entities/ProductModel";
export {Order} from "./entities/Order";
export {OrderItem} from "./entities/OrderItem";
/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {

    public sequelize: Sequelize;

    constructor(config: any) {
        this.sequelize = new Sequelize(config);
    }

    public initModels() {
        this.sequelize.addModels(this.getModels());
        return this.sequelize.sync({force: false});
    }

    private getModels() {
        return [
            AccessToken, User, Product, ProductCategory, ProductModel,
            Artikel, ArtikelCategory, Address, Order, OrderItem
        ];
    }
}


