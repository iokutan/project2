import {Op} from "sequelize";
import * as express from "express";
import {User} from "../models/entities/User";
import {Auth} from "../auth/auth";
import {logger} from "../lib/logger";
import {Utils} from "../utils";
import * as _ from 'lodash';

export class UserController {

    constructor() {

    }

    public async createUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        isActive: boolean,
        profilePicUrl?: string
      ) {

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: Utils.encryptPassword(password),
            profilePicUrl,
            isActive
        });
        return newUser.save();
    }

    public async updateUser(userId: string, email: string, firstName: string,
      lastName: string, isActive: boolean): Promise<User> {

        const user = await User.find<User>({where: {userId: userId}});
        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.isActive = isActive;
            return user.save();
        } else {
            logger.error("No user found");
            throw new Error("No user found");
        }
    }

    public async findByEmail(email: string) {
        const user = await User.findOne<User>({where: {email: email}});
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided email");
            throw new Error("No user found with the provided email");
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
      const userId = (_.get(req, 'params.userId') === 'current' || !_.get(req, 'params.userId'))
                 ? _.get(req, 'user.dataValues.userId') : _.get(req, 'params.userId');
      const user = await User.findOne<User>(
        {
          where: {
            userId: userId
          }
        });
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided userId");
            throw new Error("No user found with the provided userId");
        }
    }

    public async findById(userId: string) {
        const user = await User.findOne<User>({where: {userId}});
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided email");
            throw new Error("No user found with the provided email");
        }
    }

    public async deleteUser(userId: string): Promise<User | null> {
        const user = await User.find<User>({where: {userId}});
        if (user) {
            await user.destroy();
            return user;
        } else {
            logger.error("No user found");
            throw new Error("No user found");
        }
    }


    public async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<User> {
        const user = await User.find<User>({where: {userId}});
        if (user) {
            try{
                const authorized = await Auth.comparePasswords(currentPassword, user.password);
                if (authorized) {
                    user.password =  Utils.encryptPassword(newPassword);
                    return user.save();
                } else {
                    logger.error("Current password incorrect");
                    throw new Error("Current password incorrect");
                }
            }
            catch(err){
                throw new Error(err);
            }

        } else {
            logger.error("No user found");
            throw new Error("No user found");
        }
    }
}
