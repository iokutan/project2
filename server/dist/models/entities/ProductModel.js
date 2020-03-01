"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_1 = require("./Product");
const ProductCategory_1 = require("./ProductCategory");
const BaseModel_1 = require("./BaseModel");
let ProductModel = class ProductModel extends BaseModel_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], ProductModel.prototype, "model_id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductModel.prototype, "model_name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductModel.prototype, "imageUrl", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Product_1.Product),
    __metadata("design:type", Array)
], ProductModel.prototype, "product", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => ProductCategory_1.ProductCategory),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductModel.prototype, "category_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => ProductCategory_1.ProductCategory),
    __metadata("design:type", ProductCategory_1.ProductCategory)
], ProductModel.prototype, "category", void 0);
ProductModel = __decorate([
    sequelize_typescript_1.Table
], ProductModel);
exports.ProductModel = ProductModel;
//# sourceMappingURL=ProductModel.js.map