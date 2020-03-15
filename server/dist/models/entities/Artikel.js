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
const ArtikelCategory_1 = require("./ArtikelCategory");
let Artikel = class Artikel extends BaseModel_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Artikel.prototype, "artikel_id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Artikel.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Artikel.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Artikel.prototype, "image_url", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => ArtikelCategory_1.ArtikelCategory),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Artikel.prototype, "category_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => ArtikelCategory_1.ArtikelCategory),
    __metadata("design:type", ArtikelCategory_1.ArtikelCategory)
], Artikel.prototype, "category", void 0);
Artikel = __decorate([
    sequelize_typescript_1.Table
], Artikel);
exports.Artikel = Artikel;
//# sourceMappingURL=Artikel.js.map