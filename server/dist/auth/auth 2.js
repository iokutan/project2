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
const passport = require("passport");
const LocalStrategy = require("passport-local");
const BearerStrategy = require("passport-http-bearer");
const bcrypt = require("bcrypt-nodejs");
const User_1 = require("../models/entities/User");
const AccessToken_1 = require("../models/entities/AccessToken");
const jsonwebtoken_1 = require("jsonwebtoken");
const _ = require("lodash");
class Auth {
    static serializeUser() {
        passport.serializeUser(function (user, done) {
            done(null, user.userId);
        });
        passport.deserializeUser(function (userId, done) {
            User_1.User.find({ where: { userId } }).then(function (user) {
                done(null, user);
            });
        });
    }
    /**
     * LocalStrategy
     *
     * This strategy is used to authenticate users based on a username and password.
     * Anytime a request is made to authorize an application, we must ensure that
     * a user is logged in before asking them to approve the request.
     */
    static useLocalStrategy() {
        passport.use(new LocalStrategy((userName, password, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email: userName } });
                if (user) {
                    const authorized = yield this.comparePasswords(password, user.password);
                    if (authorized) {
                        return done(null, _.get(user, 'dataValues'));
                    }
                    else {
                        return done(null, false);
                    }
                }
                else {
                    return done("No user found", false);
                }
            }
            catch (error) {
                return done("No user found", false);
            }
        })));
    }
    static comparePasswords(pass1, pass2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pass1 && pass2) {
                return bcrypt.compareSync(pass1, pass2);
            }
            else {
                return false;
            }
        });
    }
    /**
     * BearerStrategy
     *
     * This strategy is used to authenticate users based on an access token (aka a
     * bearer token).  The user must have previously authorized a client
     * application, which is issued an access token to make requests on behalf of
     * the authorizing user.
     */
    static useBearerStrategy() {
        passport.use(new BearerStrategy((token, done) => {
            AccessToken_1.AccessToken.findOne({ where: { token: token } }).then(accessToken => {
                if (accessToken) {
                    const jwtSecret = 'cristalscmuck2019secret!';
                    if (jwtSecret) {
                        jsonwebtoken_1.verify(accessToken.token, jwtSecret, (err, decodedToken) => {
                            if (decodedToken && accessToken.userId === decodedToken.userId) {
                                User_1.User.find({
                                    where: {
                                        userId: accessToken.userId
                                    }
                                }).then(user => {
                                    return done(null, user);
                                }).catch(error => {
                                    return done(new Error(error.message), false);
                                });
                            }
                            else {
                                done(new Error(err.message), false);
                            }
                        });
                    }
                }
                else {
                    return done(new Error("Unauthorized"), false);
                }
            }).catch(function (error) {
                return done(new Error(error.message), false);
            });
        }));
    }
    static getBearerMiddleware() {
        return passport.authenticate('bearer', { session: false, failWithError: true });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map