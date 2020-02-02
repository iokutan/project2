import * as express from "express";
import {User, AccessToken} from "../models";
import {UserService} from "../services/UserService";
import {Auth} from "../auth/auth";
import {UserDTO} from "../models/dtos/UserDTO";
import * as multer from 'multer';
import {BaseController} from "./BaseController";
import * as _ from 'lodash';
import { Utils } from '../utils';

export class UserController extends BaseController {

    private userService: UserService;
    private uploadHandler: any;

    constructor() {
        super();
        this.userService = new UserService();
        this.uploadHandler = multer({ storage: multer.memoryStorage() }); // configure multer to use memory storage
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const users = await User.findAll<User>();
            const userDTOs = users.map(user => {
                return new UserDTO(user);
            });
            res.json(userDTOs);
        } catch (error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var user = await User.build(req.body);
            const errors = await user.validate();
            if (errors && errors.errors) {
                throw new Error(errors.errors.join());
            } else {
                await user.save();
                user.setDataValue("password", "**********");
                res.status(201).send(user);
            }
        } catch (error) {
            if(error.errors)
                res.status(400).send(error.errors.map(a => a.message));
            res.status(400).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        const user = await User.findOne<User>({where: { userId: req.params.userId }});
        if(user){
            user.setDataValue("password", "**********");
            res.status(201).send(user);
        } else {
            res.status(404).send("User not found");
        }
          
      } catch (error) {
          res.status(400).send(error);
      }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await User.findOne<User>({where: { userId: req.params.userId }});
            if(user){
                await user.updateAttributes(req.body);
                user.setDataValue("password", "**********");
                res.status(201).send(user);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          if(req.params.userId === req.user.userId) {
            return res.status(403).json('You are not authorized!');
          }
          const user = await User.findOne<User>({where: { userId: req.params.userId }});
          if(user) {
            await user.destroy();(req.params.userId);
            user.setDataValue("password", "**********");
            res.status(201).send(user);
          }else {
            res.status(404).send("User not found");
          }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async getByToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = _.get(req, 'user');
            user.setDataValue("password", "**********");
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }

    public async changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await User.findOne<User>({where: { userId: req.params.userId }});
            console.log(user, req.body);
            if (user) {
                try{
                    const authorized = await Auth.comparePasswords(req.body.currentPassword, user.password);
                    console.log(authorized, req.body);
                    if (authorized) {
                        user.password = req.body.newPassword;
                        await user.save();
                        user.setDataValue("password", "**********");
                        res.status(201).send(user);
                    } else {
                        throw new Error("Current password incorrect");
                    }
                }
                catch(err){
                    throw new Error(err);
                }

            } else {
                throw new Error("No user found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.delete("/:userId", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.put("/:userId", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.get("/:userId", Auth.getBearerMiddleware(),this.getById.bind(this));
        this.router.get("/current", Auth.getBearerMiddleware(), this.getByToken.bind(this));
        this.router.put("/:userId/password",  Auth.getBearerMiddleware(), this.changePassword.bind(this));
    }
}
