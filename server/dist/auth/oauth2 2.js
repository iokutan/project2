"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oauth2orize = require("oauth2orize");
const passport = require("passport");
const models_1 = require("../models");
const jsonwebtoken_1 = require("jsonwebtoken");
class Oauth2 {
    constructor() {
        this.server = oauth2orize.createServer();
        this.serializeClient();
        this.registerGrants();
        this.jwtSecret = 'cristalscmuck2019secret!';
    }
    getTokenEndpoint() {
        return [
            passport.authenticate(['local'], { session: false }),
            this.server.token(),
            this.server.errorHandler()
        ];
    }
    serializeClient() {
        this.server.serializeClient(function (user, done) {
            return done(null, user.userId);
        });
        this.server.deserializeClient(function (id, done) {
            models_1.User.findById(id).then(function (user) {
                return done(null, user);
            }, function (error) {
                return done(error);
            });
        });
    }
    registerGrants() {
        this.registerPasswordGrant();
        // this.registerClientCredentialGrant();
    }
    registerPasswordGrant() {
        this.server.exchange(oauth2orize.exchange.password((athlete, username, password, scope, done) => {
            models_1.AccessToken.findOne({ where: { userId: athlete.userId } }).then(accessToken => {
                if (accessToken) {
                    if (this.jwtSecret) {
                        jsonwebtoken_1.verify(accessToken.token, this.jwtSecret, (err, decodedToken) => {
                            if (err) {
                                accessToken.destroy().then(() => {
                                    if (this.jwtSecret) {
                                        jsonwebtoken_1.sign(athlete, this.jwtSecret, { expiresIn: "10h" }, (err, encodedToken) => {
                                            if (err) {
                                                return done(err);
                                            }
                                            models_1.AccessToken.create({
                                                token: encodedToken,
                                                userId: athlete.userId
                                            }).then((accessToken) => {
                                                return done(null, accessToken.token);
                                            }).catch((error) => {
                                                return done(error);
                                            });
                                        });
                                    }
                                    else {
                                        return done(new Error("JWT Secret Undefined"), false);
                                    }
                                });
                            }
                            else if (decodedToken && accessToken.userId === decodedToken.userId) {
                                return done(null, accessToken.token);
                            }
                            else {
                                return done(new Error("Token Validation Error"), false);
                            }
                        });
                    }
                    else {
                        return done(new Error("JWT Secret Undefined"), false);
                    }
                }
                else {
                    if (this.jwtSecret) {
                        jsonwebtoken_1.sign(athlete, this.jwtSecret, { expiresIn: "10h" }, (err, encodedToken) => {
                            if (err) {
                                return done(err);
                            }
                            models_1.AccessToken.create({
                                token: encodedToken,
                                userId: athlete.userId
                            }).then((accessToken) => {
                                return done(null, accessToken.token);
                            }).catch((error) => {
                                return done(new Error(error.message));
                            });
                        });
                    }
                    else {
                        return done(new Error("JWT Secret Undefined"));
                    }
                }
            });
        }));
    }
}
exports.Oauth2 = Oauth2;
//# sourceMappingURL=oauth2.js.map