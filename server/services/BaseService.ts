import * as express from "express";
import {BaseModel} from "../models/entities/BaseModel";
import { Model } from "sequelize-typescript";

export class BaseService<T extends BaseModel<T>> {
    private model: T;

    constructor(pmodel: T) {
        this.model = pmodel;
    }

    public async createUser(data: any){
        try {
            console.log("RESUUULT 266666", data);
            return await this.model.save(data);
        } catch (error) {
            console.log("RESUUULT 23333333", error);
            throw new Error(error);
        }
    }
}