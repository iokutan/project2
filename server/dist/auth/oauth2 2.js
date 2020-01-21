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
    // token endpoint
    //
    // `token` middleware handles client requests to exchange authorization grants
    // for access tokens.  Based on the grant type being exchanged, the above
    // exchange middleware will be invoked to handle the request.  Clients must
    // authenticate when making requests to this endpoint.
    getTokenEndpoint() {
        return [
            passport.authenticate(['local'], { session: false }),
            this.server.token(),
            this.server.errorHandler()
        ];
    }
    // Register serialialization and deserialization functions.
    //
    // When a client redirects a user to user authorization endpoint, an
    // authorization transaction is initiated.  To complete the transaction, the
    // user must authenticate and approve the authorization request.  Because this
    // may involve multiple HTTP request/response exchanges, the transaction is
    // stored in the session.
    //
    // An application must supply serialization functions, which determine how the
    // client object is serialized into the session.  Typically this will be a
    // simple matter of serializing the client's ID, and deserializing by finding
    // the client by ID from the database.
    serializeClient() {
        console.log("geldim");
        this.server.serializeClient(function (user, done) {
            console.log("geldim 2", user);
            return done(null, user.userId);
        });
        this.server.deserializeClient(function (id, done) {
            models_1.User.findById(id).then(function (user) {
                console.log("geldim 3", user);
                return done(null, user);
            }, function (error) {
                return done(error);
            });
        });
    }
    // Register supported grant types.
    //
    // OAuth 2.0 specifies a framework that allows users to grant client
    // applications limited access to their protected resources.  It does this
    // through a process of the user granting access, and the client exchanging
    // the grant for an access token.
    registerGrants() {
        this.registerPasswordGrant();
        // this.registerClientCredentialGrant();
    }
    // PASSWORD GRANT TYPE
    // Exchange user id and password for access tokens.  The callback accepts the
    // `client`, which is exchanging the user's name and password from the
    // authorization request for verification. If these values are validated, the
    // application issues an access token on behalf of the user who authorized the code.
    registerPasswordGrant() {
        console.log("nerdesin 0");
        this.server.exchange(oauth2orize.exchange.password((athlete, username, password, scope, done) => {
            models_1.AccessToken.findOne({ where: { userId: athlete.userId } }).then(accessToken => {
                console.log("nerdesin 1");
                if (accessToken) {
                    if (this.jwtSecret) {
                        jsonwebtoken_1.verify(accessToken.token, this.jwtSecret, (err, decodedToken) => {
                            console.log("nerdesin", decodedToken, accessToken.userId);
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
                    console.log("nerdesin 2");
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