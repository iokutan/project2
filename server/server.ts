import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as databaseSettings from "./config/config";
import * as http from "http";
import * as cors  from 'cors';
import {Auth} from "./auth/auth";
import {Models} from "./models";
import {Controller} from "./controllers/index";
import {logger} from "./lib/logger";
import * as _ from 'lodash';

export class Server {

    public static app: express.Express;

    constructor() {}

    public static async initializeApp(): Promise<http.Server> {
        try {
            Server.app = express();
            Server.configureApp();
            Server.initializeAuth();
            

            try {
                await Server.initializeDatabase();
                logger.debug('Database open [STARTED]...');
            } catch(error) {
                logger.error('Failed to initialize database', error);
            }

            Controller.initializeControllers(Server.app);
            return Server.app.listen(Server.app.get('port'));

        } catch(error) {
            throw new Error(error.message);
        }

    }

    private static initializeDatabase() {
      const sequelizeConfig = databaseSettings.config.development;
      const models = new Models(sequelizeConfig);
      return models.initModels();
    }

    private static initializeAuth() {
        Server.app.use(passport.initialize());
        Auth.serializeUser();
        Auth.useBearerStrategy();
        Auth.useLocalStrategy();
    }

    private static configureApp() {
        Server.app.set('port', process.env.PORT || 3001);
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use(compression());
        Server.app.use(cors());
    }
}