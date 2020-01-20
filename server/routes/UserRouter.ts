import * as express from "express";
import {User, AccessToken} from "../models";
import {UserController} from "../controllers/UserController";
import {Auth} from "../auth/auth";
import {UserDTO} from "../models/dtos/UserDTO";
import * as multer from 'multer';
import {BaseRouter} from "./BaseRouter";
import * as _ from 'lodash';

export class UserRouter extends BaseRouter {

    private userManager: UserController;
    private uploadHandler: any;

    constructor() {
        super();
        this.userManager = new UserController();
        this.uploadHandler = multer({ storage: multer.memoryStorage() }); // configure multer to use memory storage
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (req.query.email) {
                const user = await this.userManager.findByEmail(req.query.email);
                res.json(new UserDTO(user));
            }
            if(req.user.role === 'member') {
              const user = await User.findOne<User>({ where: { userId: req.user.userId }});
              if(user) {
                return res.json([new UserDTO(user)]);
              }
              throw new Error('No user found!');
            }
            else {
                const users = await User.findAll<User>();
                const userDTOs = users.map(user => {
                    return new UserDTO(user);
                });
                res.json(userDTOs);
            }
        } catch (error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.createUser(
              req.body.email,
              req.body.password,
              req.body.firstName,
              req.body.lastName,
              req.body.isActive,
              req.body.profilePicUrl
            );
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
          const user = await this.userManager.getById(req, res, next);
          const sanitizedUser = _.omit(user, ['dataValues.password']);
          res.json(_.get(sanitizedUser, 'dataValues'));
      } catch (error) {
          next(error);
      }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.updateUser(
               req.params.userId,
               req.body.email,
               req.body.firstName,
               req.body.lastName,
               req.body.isActive
            );
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          if(req.params.userId === req.user.userId) {
            return res.status(403).json('You are not authorized!');
          }
            const user = await this.userManager.deleteUser(req.params.userId);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async getByToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = _.get(req, 'user');
            console.log("sen kimsin", user);
            return res.status(201).json(user);
        } catch (error) {
          console.log("sen kimsin hata", error);
            next(error);
        }
    }

    public async changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.updatePassword(req.params.userId, req.body.currentPassword, req.body.newPassword);
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:userId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:userId", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.get("/:userId", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/current", Auth.getBearerMiddleware(), this.getByToken.bind(this));
        this.router.put("/:userId/password",  Auth.getBearerMiddleware(), this.changePassword.bind(this));
    }
}
