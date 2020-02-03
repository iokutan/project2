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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let BaseModel = class BaseModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseModel.prototype, "creationDate", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseModel.prototype, "updatedOn", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseModel.prototype, "deletionDate", void 0);
BaseModel = __decorate([
    sequelize_typescript_1.Table
], BaseModel);
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map