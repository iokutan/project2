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
const BaseModel_1 = require("./BaseModel");
const Address_1 = require("./Address");
const OrderItem_1 = require("./OrderItem");
const User_1 = require("./User");
let Order = class Order extends BaseModel_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Order.prototype, "order_id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "due_date", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => OrderItem_1.OrderItem),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "buyer_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Address_1.Address),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "delivery_address", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Address_1.Address),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "payment_address", void 0);
Order = __decorate([
    sequelize_typescript_1.Table
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map