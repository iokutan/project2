import * as express from "express";
import { Oauth2 } from "../auth/oauth2";
import {AuthenticationService} from "../services/AuthenticationService";
import {Auth} from "../auth/auth";
import {BaseController} from "./BaseController";

export class AuthController extends BaseController {

    private authManager: AuthenticationService;

    constructor() {
        super();
        this.authManager = new AuthenticationService();
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
