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
class ProductModelController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCategories = yield models_1.ProductModel.findAll({
                    include: [models_1.ProductCategory]
                });
                res.json(productCategories);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productModels = yield models_1.ProductModel.findAll({
                    where: { category_id: req.params.category_id },
                    include: [models_1.ProductCategory]
                });
                res.json(productModels);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield models_1.ProductModel
                    .findOne({ where: { model_id: req.params.model_id } });
                if (model) {
                    res.status(201).send(model);
                }
                else {
                    res.status(404).send("model not found");
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
                var productCategorie = yield models_1.ProductModel.build(req.body);
                const errors = yield productCategorie.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield productCategorie.save();
                    res.status(201).send(productCategorie);
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
                const productCategorie = yield models_1.ProductModel.findOne({ where: { model_id: req.params.model_id } });
                if (productCategorie) {
                    yield productCategorie.update(req.body);
                    res.status(201).send(productCategorie);
                }
                else {
                    res.status(404).send("ProductModel not found");
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
                const product = yield models_1.Product
                    .findOne({ where: { category_id: req.params.model_id } });
                if (product) {
                    return res.status(401).send("Can not be deleted, has Child Products");
                }
                const productCategorie = yield models_1.ProductModel.findOne({ where: { model_id: req.params.model_id } });
                if (productCategorie) {
                    yield productCategorie.destroy();
                    res.status(201).send(productCategorie);
                }
                else {
                    res.status(404).send("ProductModel not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:model_id", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/byCategory/:category_id", auth_1.Auth.getBearerMiddleware(), this.getByCategory.bind(this));
        this.router.post("/:category_id", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:model_id", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:model_id", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.ProductModelController = ProductModelController;
//# sourceMappingURL=ProductModelController.js.map