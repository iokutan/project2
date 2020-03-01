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
const uuid_1 = require("uuid");
const BaseController_1 = require("./BaseController");
const path = require("path");
class ProductController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.Product.findAll({
                    include: [
                        {
                            model: models_1.ProductModel,
                            include: [models_1.ProductCategory]
                        }
                    ]
                });
                res.json(products);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield models_1.Product
                    .findOne({
                    where: { product_id: req.params.productId },
                    include: [
                        {
                            model: models_1.ProductModel,
                            include: [models_1.ProductCategory]
                        }
                    ]
                });
                if (product) {
                    res.status(201).send(product);
                }
                else {
                    res.status(404).send("product not found");
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
                const product = yield models_1.Product.build(req.body);
                const errors = yield product.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield product.save();
                    res.status(201).send(product);
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
                let product = yield models_1.Product.findOne({
                    where: { product_id: req.params.productId }
                });
                if (product) {
                    yield product.update(req.body);
                    product = yield models_1.Product.findOne({
                        where: { product_id: req.params.productId },
                        include: [
                            {
                                model: models_1.ProductModel,
                                include: [models_1.ProductCategory]
                            }
                        ]
                    });
                    res.status(201).send(product);
                }
                else {
                    res.status(404).send("product not found");
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
                const product = yield models_1.Product.findOne({ where: { product_id: req.params.productId } });
                if (product) {
                    yield product.destroy();
                    res.status(201).send(product);
                }
                else {
                    res.status(404).send("artikel not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = path.join(__dirname, '../../public/images/');
                if (!req.files) {
                    return res.status(404).json({ error: 'Please provide an image' });
                }
                let file = req.files['file'];
                const fileIdentifier = uuid_1.v4();
                file.mv(`${imagePath}/${fileIdentifier}_${file.name}`);
                res.status(200).json({ name: file.name, imagePath: `${req.protocol}://${req.get('host')}/images/${fileIdentifier}_${file.name}` });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:productId", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/create/:productId", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.post("/uploadImage", auth_1.Auth.getBearerMiddleware(), this.uploadImage.bind(this));
        this.router.delete("/:productId", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:productId", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map