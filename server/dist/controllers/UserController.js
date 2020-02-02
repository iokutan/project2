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
const UserService_1 = require("../services/UserService");
const auth_1 = require("../auth/auth");
const UserDTO_1 = require("../models/dtos/UserDTO");
const multer = require("multer");
const BaseController_1 = require("./BaseController");
const _ = require("lodash");
class UserController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.userService = new UserService_1.UserService();
        this.uploadHandler = multer({ storage: multer.memoryStorage() }); // configure multer to use memory storage
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll();
                const userDTOs = users.map(user => {
                    return new UserDTO_1.UserDTO(user);
                });
                res.json(userDTOs);
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var user = yield models_1.User.build(req.body);
                const errors = yield user.validate();
                if (errors && errors.errors) {
                    throw new Error(errors.errors.join());
                }
                else {
                    yield user.save();
                    user.setDataValue("password", "**********");
                    res.status(201).send(user);
                }
            }
            catch (error) {
                if (error.errors)
                    res.status(400).send(error.errors.map(a => a.message));
                res.status(400).send(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({ where: { userId: req.params.userId } });
                if (user) {
                    user.setDataValue("password", "**********");
                    res.status(201).send(user);
                }
                else {
                    res.status(404).send("User not found");
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({ where: { userId: req.params.userId } });
                if (user) {
                    yield user.updateAttributes(req.body);
                    user.setDataValue("password", "**********");
                    res.status(201).send(user);
                }
                else {
                    res.status(404).send("User not found");
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
                if (req.params.userId === req.user.userId) {
                    return res.status(403).json('You are not authorized!');
                }
                const user = yield models_1.User.findOne({ where: { userId: req.params.userId } });
                if (user) {
                    yield user.destroy();
                    (req.params.userId);
                    user.setDataValue("password", "**********");
                    res.status(201).send(user);
                }
                else {
                    res.status(404).send("User not found");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getByToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = _.get(req, 'user');
                user.setDataValue("password", "**********");
                res.status(201).send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({ where: { userId: req.params.userId } });
                console.log(user, req.body);
                if (user) {
                    try {
                        const authorized = yield auth_1.Auth.comparePasswords(req.body.currentPassword, user.password);
                        console.log(authorized, req.body);
                        if (authorized) {
                            user.password = req.body.newPassword;
                            yield user.save();
                            user.setDataValue("password", "**********");
                            res.status(201).send(user);
                        }
                        else {
                            throw new Error("Current password incorrect");
                        }
                    }
                    catch (err) {
                        throw new Error(err);
                    }
                }
                else {
                    throw new Error("No user found");
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:userId", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:userId", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.get("/:userId", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/current", auth_1.Auth.getBearerMiddleware(), this.getByToken.bind(this));
        this.router.put("/:userId/password", auth_1.Auth.getBearerMiddleware(), this.changePassword.bind(this));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map