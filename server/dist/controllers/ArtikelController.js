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
class ArtikelController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artikels = yield models_1.Artikel.findAll({
                    include: [models_1.ArtikelCategory]
                });
                res.json(artikels);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var artikel = yield models_1.Artikel.build(req.body);
                const errors = yield artikel.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield artikel.save();
                    res.status(201).send(artikel);
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
                const address = yield models_1.Artikel.findOne({ where: { artikel_id: req.params.artikelId } });
                if (address) {
                    yield address.updateAttributes(req.body);
                    res.status(201).send(address);
                }
                else {
                    res.status(404).send("artikel not found");
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artikel = yield models_1.Artikel
                    .findOne({
                    where: { artikel_id: req.params.artikelId },
                });
                if (artikel) {
                    res.status(201).send(artikel);
                }
                else {
                    res.status(404).send("artikel not found");
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
                const address = yield models_1.Artikel.findOne({ where: { artikel_id: req.params.artikelId } });
                if (address) {
                    yield address.destroy();
                    res.status(201).send(address);
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
    buildRoutes() {
        this.router.get("/", this.get.bind(this));
        this.router.get("/:artikelId", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/:categoryId", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:artikelId", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:artikelId", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
    }
}
exports.ArtikelController = ArtikelController;
//# sourceMappingURL=ArtikelController.js.map