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
class ArtikelCategoryController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artikels = yield models_1.ArtikelCategory.findAll();
                res.json(artikels);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.ArtikelCategory
                    .findOne({
                    where: { category_id: req.params.categoryId },
                });
                if (category) {
                    res.status(201).send(category);
                }
                else {
                    res.status(404).send("category not found");
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
                var artikelCategory = yield models_1.ArtikelCategory.build(req.body);
                const errors = yield artikelCategory.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield artikelCategory.save();
                    res.status(201).send(artikelCategory);
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
                const artikelCategory = yield models_1.ArtikelCategory.findOne({ where: { category_id: req.params.categoryId } });
                if (artikelCategory) {
                    yield artikelCategory.updateAttributes(req.body);
                    res.status(201).send(artikelCategory);
                }
                else {
                    res.status(404).send("artikelCategory not found");
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
                const artikelCategory = yield models_1.ArtikelCategory.findOne({ where: { category_id: req.params.categoryId } });
                if (artikelCategory) {
                    yield artikelCategory.destroy();
                    res.status(201).send(artikelCategory);
                }
                else {
                    res.status(404).send("artikelCategory not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:categoryId", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:categoryId", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:categoryId", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.ArtikelCategoryController = ArtikelCategoryController;
//# sourceMappingURL=ArtikelCategoryController.js.map