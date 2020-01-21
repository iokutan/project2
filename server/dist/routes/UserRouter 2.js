"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../auth/auth");
const UserDTO_1 = require("../models/dtos/UserDTO");
const multer = require("multer");
const BaseRouter_1 = require("./BaseRouter");
const _ = require("lodash");
class UserRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.userManager = new UserController_1.UserController();
        this.uploadHandler = multer({ storage: multer.memoryStorage() }); // configure multer to use memory storage
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.email) {
                    const user = yield this.userManager.findByEmail(req.query.email);
                    res.json(new UserDTO_1.UserDTO(user));
                }
                if (req.user.role === 'member') {
                    const user = yield models_1.User.findOne({ where: { userId: req.user.userId } });
                    if (user) {
                        return res.json([new UserDTO_1.UserDTO(user)]);
                    }
                    throw new Error('No user found!');
                }
                else {
                    const users = yield models_1.User.findAll();
                    const userDTOs = users.map(user => {
                        return new UserDTO_1.UserDTO(user);
                    });
                    res.json(userDTOs);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.createUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.isActive, req.body.profilePicUrl);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.getById(req, res, next);
                const sanitizedUser = _.omit(user, ['dataValues.password']);
                res.json(_.get(sanitizedUser, 'dataValues'));
            }
            catch (error) {
                next(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.updateUser(req.params.userId, req.body.email, req.body.firstName, req.body.lastName, req.body.isActive);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.userId === req.user.userId) {
                    return res.status(403).json('You are not authorized!');
                }
                const user = yield this.userManager.deleteUser(req.params.userId);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = _.get(req, 'user');
                console.log("sen kimsin", user);
                return res.status(201).json(user);
            }
            catch (error) {
                console.log("sen kimsin hata", error);
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.updatePassword(req.params.userId, req.body.currentPassword, req.body.newPassword);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
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
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map