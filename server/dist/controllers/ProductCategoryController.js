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
class ProductCategoryController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCategories = yield models_1.ProductCategory.findAll();
                res.json(productCategories);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield models_1.ProductCategory
                    .findOne({ where: { category_id: req.params.category_id } });
                if (product) {
                    res.status(201).send(product);
                }
                else {
                    res.status(404).send("ProductCategory not found");
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
                var productCategorie = yield models_1.ProductCategory.build(req.body);
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
                    return res.status(400).send(error.errors.map(a => a.message));
                res.status(400).send(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCategorie = yield models_1.ProductCategory.findOne({ where: { category_id: req.params.category_id } });
                if (productCategorie) {
                    yield productCategorie.update(req.body);
                    res.status(201).send(productCategorie);
                }
                else {
                    res.status(404).send("ProductCategory not found");
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
                const productCategorie = yield models_1.ProductCategory.findOne({ where: { category_id: req.params.category_id } });
                if (productCategorie) {
                    yield productCategorie.destroy();
                    res.status(201).send(productCategorie);
                }
                else {
                    res.status(404).send("ProductCategory not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.get("/:category_id", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.delete("/:category_id", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:category_id", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.ProductCategoryController = ProductCategoryController;
//# sourceMappingURL=ProductCategoryController.js.map