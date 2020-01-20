import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as ClientPasswordStrategy from "passport-oauth2-client-password";
import * as BearerStrategy from "passport-http-bearer";
import * as bcrypt from "bcrypt-nodejs";
import {BasicStrategy} from "passport-http";
import {User} from "../models/entities/User";
import {AccessToken} from "../models/entities/AccessToken";
import {sign, verify} from 'jsonwebtoken';
import * as _  from 'lodash';

export class Auth {

    static serializeUser() {
        passport.serializeUser(function (user: any, done) {
            done(null, user.userId);
        });

        passport.deserializeUser(function (userId: string, done) {
            User.find<User>({where: {userId}}).then(function (user: User) {
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
        passport.use(new LocalStrategy( async(userName, password, done) => {
            try {
                const user = await User.findOne<User>({where: {email: userName}});
                if(user) {
                    const authorized = await this.comparePasswords(password, user.password);
                    if(authorized) {
                       return done(null, _.get(user, 'dataValues'));
                    } else {
                        return done(null, false);
                    }
                } else {
                    return done("No user found", false);
                }
            } catch (error) {
                return done("No user found", false);
            }

        }));
    }

    static async comparePasswords(pass1: string | undefined, pass2: string | undefined): Promise<boolean> {
        if(pass1 && pass2) {
            return bcrypt.compareSync(pass1, pass2);
        } else {
            return false;
        }
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
            AccessToken.findOne<AccessToken>({where: {token: token}}).then(accessToken => {
                if (accessToken) {
                    const jwtSecret: string | undefined = 'cristalscmuck2019secret!';
                    if(jwtSecret) {
                        verify(accessToken.token, jwtSecret, (err, decodedToken: any) => {
                            if (decodedToken && accessToken.userId === decodedToken.userId) {

                                User.find(
                                  {
                                    where:
                                    {
                                      userId: accessToken.userId
                                    }
                                  }).then(user => {
                                    return done(null, user);
                                }).catch(error => {
                                    return done(new Error(error.message), false);
                                });
                            } else {
                                done(new Error(err.message), false);
                            }
                        });
                    }
                } else {
                    return done(new Error("Unauthorized"), false);
                }
            }).catch(function (error) {
                return done(new Error(error.message), false);
            });
        }));
    }

    public static getBearerMiddleware() {
        return passport.authenticate('bearer', {session: false, failWithError: true});
    }
}








