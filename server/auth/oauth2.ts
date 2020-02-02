
import * as oauth2orize from "oauth2orize";
import * as passport from "passport";
import {AccessToken, User} from "../models";
import {sign, verify} from "jsonwebtoken";

export class Oauth2 {

    private server;
    private jwtSecret: string | undefined;

    constructor() {
        this.server = oauth2orize.createServer();
        this.serializeClient();
        this.registerGrants();
        this.jwtSecret = 'cristalscmuck2019secret!';
    }

    public getTokenEndpoint() {
        return [
          passport.authenticate(['local'], { session: false }),
          this.server.token(),
          this.server.errorHandler()
      ];
    }

    private serializeClient() {
        this.server.serializeClient(function(user, done) {
            return done(null, user.userId);
        });

        this.server.deserializeClient(function(id, done) {
            User.findById(id).then(function(user) {
                return done(null, user);
            }, function(error) {
                return done(error);
            });
        });
    }

    private registerGrants() {
        this.registerPasswordGrant();
        // this.registerClientCredentialGrant();
    }

    private registerPasswordGrant() {
        this.server.exchange(oauth2orize.exchange.password((athlete, username, password, scope, done) => {

            AccessToken.findOne<AccessToken>({where: {userId: athlete.userId}}).then(accessToken => {
                if(accessToken) {
                    if(this.jwtSecret) {
                        verify(accessToken.token, this.jwtSecret, (err, decodedToken: any) => {
                            if(err) {
                                accessToken.destroy().then(() => {
                                    if(this.jwtSecret) {
                                        sign(athlete, this.jwtSecret, { expiresIn: "10h"}, (err, encodedToken) => {
                                            if(err) {
                                                return done(err);
                                            }
                                            AccessToken.create({
                                                token: encodedToken,
                                                userId: athlete.userId
                                            }).then((accessToken: AccessToken) => {
                                                return done(null, accessToken.token);
                                            }).catch((error) => {
                                                return done(error);
                                            });
                                        });
                                    } else {
                                        return done(new Error("JWT Secret Undefined"), false);
                                    }

                                });
                            } else if (decodedToken && accessToken.userId === decodedToken.userId) {
                                return done(null, accessToken.token);
                            } else {
                                return done(new Error("Token Validation Error"), false);
                            }
                        });
                    } else {
                        return done(new Error("JWT Secret Undefined"), false);
                    }

                } else {
                    if(this.jwtSecret) {
                        sign(athlete, this.jwtSecret, { expiresIn: "10h"}, (err, encodedToken) => {
                            if(err) {
                                return done(err);
                            }
                            AccessToken.create({
                                token: encodedToken,
                                userId: athlete.userId
                            }).then((accessToken: AccessToken) => {
                                return done(null, accessToken.token);
                            }).catch((error) => {
                                return done(new Error(error.message));
                            });
                        });
                    } else {
                        return done(new Error("JWT Secret Undefined"));
                    }

                }
            });

        }));
    }
}
