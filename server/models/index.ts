import {Sequelize} from 'sequelize-typescript';
import {AccessToken} from "./entities/AccessToken";
import {Client} from "./entities/Client";
import {User} from "./entities/User";

export {Sequelize} from 'sequelize-typescript';
export {AccessToken} from "./entities/AccessToken";
export {Client} from "./entities/Client";
export {User} from "./entities/User";

/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {

    public sequelize: Sequelize;

    constructor(config: any) {
        this.sequelize = new Sequelize(config);
    }

    public initModels() {
        this.sequelize.addModels(this.getModels());
        return this.sequelize.sync({force: false});
    }

    private getModels() {
        return [
            AccessToken, Client, User
        ];
    }
}

