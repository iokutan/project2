import * as express from "express";
import { Oauth2 } from "../auth/oauth2";
import * as passport from "passport";
import {AuthenticationController} from "../controllers/AuthenticationController";
import {Auth} from "../auth/auth";
import {BaseRouter} from "./BaseRouter";

export class AuthRouter extends BaseRouter {

    private authManager: AuthenticationController;

    constructor() {
        super();
        this.authManager = new AuthenticationController();
        this.buildRoutes();
    }

    public async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.authManager.logout(req.user);
            res.json(user);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        const oath = new Oauth2();
        this.router.post("/token", oath.getTokenEndpoint());
        this.router.post("/logout", Auth.getBearerMiddleware(),  this.logout.bind(this));
    }
}
