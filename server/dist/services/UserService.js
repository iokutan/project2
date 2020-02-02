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
const User_1 = require("../models/entities/User");
const auth_1 = require("../auth/auth");
const logger_1 = require("../lib/logger");
const utils_1 = require("../utils");
const _ = require("lodash");
const Address_1 = require("../models/entities/Address");
const BaseService_1 = require("./BaseService");
class UserService extends BaseService_1.BaseService {
    constructor() {
        super(new User_1.User());
    }
    updateUser(userId, email, firstName, lastName, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { userId: userId } });
            if (user) {
                user.email = email || user.email;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.isActive = isActive;
                return user.save();
            }
            else {
                logger_1.logger.error("No user found");
                throw new Error("No user found");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: email } });
            if (user) {
                return user;
            }
            else {
                logger_1.logger.error("No user found with the provided email");
                throw new Error("No user found with the provided email");
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_.get(req, 'params.userId') === 'current' || !_.get(req, 'params.userId'))
                ? _.get(req, 'user.dataValues.userId') : _.get(req, 'params.userId');
            const user = yield User_1.User.findOne({
                where: {
                    userId: userId
                },
                include: [Address_1.Address]
            });
            if (user) {
                return user;
            }
            else {
                logger_1.logger.error("No user found with the provided userId");
                throw new Error("No user found with the provided userId");
            }
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { userId } });
            if (user) {
                return user;
            }
            else {
                logger_1.logger.error("No user found with the provided email");
                throw new Error("No user found with the provided email");
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { userId } });
            if (user) {
                yield user.destroy();
                return user;
            }
            else {
                logger_1.logger.error("No user found");
                throw new Error("No user found");
            }
        });
    }
    updatePassword(userId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { userId } });
            if (user) {
                try {
                    const authorized = yield auth_1.Auth.comparePasswords(currentPassword, user.password);
                    if (authorized) {
                        user.password = utils_1.Utils.encryptPassword(newPassword);
                        return user.save();
                    }
                    else {
                        logger_1.logger.error("Current password incorrect");
                        throw new Error("Current password incorrect");
                    }
                }
                catch (err) {
                    throw new Error(err);
                }
            }
            else {
                logger_1.logger.error("No user found");
                throw new Error("No user found");
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map